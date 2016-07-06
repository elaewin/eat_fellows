var selectedRest = '';
var restName = document.getElementById('loc_name');
var picture = document.getElementById('loc_picture');
var address = document.getElementById('loc_address');
var phone = document.getElementById('loc_phone');
var type = document.getElementById('loc_type');
var cost = document.getElementById('loc_cost');
var rating = document.getElementById('loc_rating');
var gfc = document.getElementById('loc_gfc');
var ulEl = document.getElementById('user_reviews');
var details = document.getElementById('details');
var wholeList = document.getElementById('all_restaurants');
var restList = document.getElementById('rest_list');

// Reviews form variables
var uname_r = document.getElementById('username');
var fave_r = document.getElementById('fav_item');
var code_r = document.getElementById('code_check');
var cost_r = document.getElementById('cost_drp');
var rate_r = document.getElementById('rating_drp');
var comments_r = document.getElementById('review');
var submit = document.getElementById('submitReviewBtn');
var divAddNew = document.getElementById('add_new_review');

function addNewRest(name, address, phone, types, vegan, image) {
// Add a new restaurant to the database
  tmp = new Restaurant(name, address, phone, types, vegan, image);
  restaurants.push(tmp);
  restaurants = sortByName(restaurants);
  localStorage.eatFellows = JSON.stringify(restaurants);
}

function addNewReview(restname, username, faveDish, code, cost, rating, comment) {
// Add a new review to a restaurant
  newReview = new Review(username, faveDish, code, cost, rating, comment);
  matchSelectedRestwithObj(restname).reviews.push(newReview);
  localStorage.eatFellows = JSON.stringify(restaurants);
}

// Checks if a restaurant is in local storage.
var checkLocalStorage = function() {
  if(localStorage.storedSelection) {
    details.style.display = 'block';
    reviews.style.display = 'block';
    selectedRest = JSON.parse(localStorage.storedSelection);
    //re-attach lost methods from JSON strip
    selectedRest.avgRating = function() {
      return getAverage(this.reviews, 'rating');
    };
    selectedRest.avgCost = function() {
      return getAverage(this.reviews, 'cost');
    };
    selectedRest.goodToCode = function() {
      x = getAverage(this.reviews, 'code');
      if (x >= 0.5) {
        return true;
      } else {
        return false;
      }
    };
  } else {
    wholeList.style.display = 'block';
    showAllRestaurants();
  }
};

// Builds an element and adds it to another element, attribute optional
var buildNewElement = function(kind, content, where, attName, attValue) {
  var x = document.createElement(kind);
  x.innerHTML = content;
  if(attName && attValue) {
    x.setAttribute(attName, attValue);
  }
  where.appendChild(x);
};

// loads restaurant information into the DOM.
var loadDetails = function() {
  var ratingGrades = ['Do Not Want.', 'Not Great', 'Alright.', 'Pretty Great.', 'This Joint Rocks!'];
  var costGrades = ['Cheap!', 'Reasonable.', 'Pricey.'];
  if(selectedRest) {
    type.innerHTML = '';
    ulEl.innerHTML = '';
    rating.textContent = '';
    cost.textContent = '';

    restName.textContent = selectedRest.name;
    address.textContent = selectedRest.address;
    phone.textContent = selectedRest.phone;
    picture.setAttribute('src', selectedRest.image);
    for(var i = 0; i < selectedRest.type.length; i++) {
      buildNewElement('li', selectedRest.type[i], type);
    }
    x = parseInt(selectedRest.avgRating());
    rating.textContent = ratingGrades[x - 1];
    x = parseInt(Math.floor(selectedRest.avgCost()));
    cost.textContent = costGrades[x - 1];
    var tf = selectedRest.goodToCode();
    if (tf) {
      tf = 'Yes!';
    } else {
      tf = 'No :(';
    }
    gfc.textContent = tf;
    for(var i = 0; i < selectedRest.reviews.length; i++) {
      buildNewElement('li', '<p>' + selectedRest.reviews[i].name + ' says:' + '</p>' + '<p>"' + selectedRest.reviews[i].comment + '"</p><p>Favorite thing to order: ' + selectedRest.reviews[i].faveDish + '</p>' , ulEl);
    }
  }
};

// Displays all of the restaurants in the array as a formatted list.
var showAllRestaurants = function() {
  restList.innerHTML = '';
  for(var i = 0; i < restaurants.length; i++) {
    buildNewElement('li', '<div><h4>' + restaurants[i].name + '</h4><p>' + restaurants[i].address + '</p><p>' + restaurants[i].phone + '</p><p>' + restaurants[i].type + '</p><a href="location.html"><button name="' + restaurants[i].name + '">Read Reviews</button></a></div>', restList);
  }
};

// Add a selected restaurant to local storage and update the page
var handleNewRest = function(event) {
  var clicked = event.target.name;
  console.log('clicked on:', clicked);
  handleRestSelect(clicked);
  main();
};

// Event listener to display a particular restaurant
wholeList.addEventListener('click', handleNewRest);

function matchSelectedRestwithObj(selection) {
  for (var i = 0; i < restaurants.length; i++) {
    if (selection === restaurants[i].name) {
      return restaurants[i];
    } else {
      console.log('no match found.');
    }
  }
}

function setupListener() {
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    if (selectedRest && uname_r.value && cost_r.value && rate_r.value && comments_r.value) {
      addNewReview(selectedRest.name, uname_r.value, fave_r.value, parseInt(code_r.value), parseInt(cost_r.value), parseInt(rate_r.value), comments_r.value);
      handleRestSelect(selectedRest.name);
      divAddNew.setAttribute('class', 'hide');
      main();
    } else {
      alert('Enter all fields.');
      return null;
    }
  });
}

function main() {
  checkLocalStorage();
  loadDetails();
  setupListener();
}

main();

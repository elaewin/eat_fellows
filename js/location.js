var selectedRest;
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

function addNewRest(name, address, phone, types, vegan, image) {
// Add a new restaurant to the database
  tmp = new Restaurant(name, address, phone, types, vegan, image);
  restaurants.push(tmp);
  restaurants = sortByName(restaurants);
  localStorage.eatFellows = JSON.stringify(restaurants);
}

function addNewReview(restname, username, faveDish, code, cost, rating) {
// Add a new review to a restaurant
  newReview = new ReviewReview(username, faveDish, code, cost, rating);
  restname.reviews.push(newReview);
  localStorage.eatFellows = JSON.stringify(restaurants);
}

// Checks if a restaurant is in local storage.
function checkLocalStorage() {
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

// Builds an element and adds it to another element
function buildNewElement(kind, content, where) {
  var x = document.createElement(kind);
  x.innerHTML = content;
  where.appendChild(x);
}

// loads restaurant information into the DOM.
var loadDetails = function() {
  if(selectedRest) {
    restName.textContent = selectedRest.name;
    address.textContent = selectedRest.address;
    phone.textContent = selectedRest.phone;
    picture.setAttribute('src', selectedRest.image);
    for(var i = 0; i < selectedRest.type.length; i++) {
      buildNewElement('li', selectedRest.type[i], type);
    }
    // type.textContent = selectedRest.type;
    rating.textContent = selectedRest.avgRating();
    cost.textContent = selectedRest.avgCost();
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
    buildNewElement('li', '<div><h4>' + restaurants[i].name + '</h4><p>' + restaurants[i].address + '</p><p>' + restaurants[i].phone + '</p><p>' + restaurants[i].type + '</p><a href="location.html"><button>More Info</button></a></div>', restList);
  }
};

checkLocalStorage();
loadDetails();

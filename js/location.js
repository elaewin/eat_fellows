var selectedRest = '';
var restName = document.getElementById('loc_name');
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

// Checks if a restaurant is in local storage.
function checkLocalStorage() {
  if(localStorage.storedSelection) {
    details.style.display = 'block';
    selectedRest = JSON.parse(localStorage.storedSelection);
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
    for(var i = 0; i < selectedRest.type.length; i++) {
      buildNewElement('li', selectedRest.type[i], type);
    }
    // type.textContent = selectedRest.type;
    rating.textContent = selectedRest.reviews[0].rating;
    cost.textContent = selectedRest.reviews[0].cost;
    gfc.textContent = selectedRest.reviews[0].code;
    for(var i = 0; i < selectedRest.reviews.length; i++) {
      buildNewElement('li', '<p>' + selectedRest.reviews[i].name + ' says:' + '</p>' + '<p>"' + selectedRest.reviews[i].comment + '"</p><p>Favorite thing to order: ' + selectedRest.reviews[i].faveDish + '</p>' , ulEl);
    }
  }
};

// Displays all of the restaurants in the array as a formatted list.
var showAllRestaurants = function() {
  restList.innerHTML = '';
  for(var i = 0; i < restaurants.length; i++) {
    buildNewElement('li', '<div class="tooltip"><h4>' + restaurants[i].name + '</h4><p>' + restaurants[i].address + '</p><p>' + restaurants[i].phone + '</p><p>' + restaurants[i].type + '</p><a href="location.html"><button>More Info</button></a></div>', restList);
  }
};

checkLocalStorage();
loadDetails();

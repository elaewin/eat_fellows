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
var restList = document.getElementById('rest_list');

function checkLocalStorage() {
  if(localStorage.storedSelection) {
    selectedRest = JSON.parse(localStorage.storedSelection);
    console.log('restaurant found');
  }
};

// Builds an element and adds it to another element
function buildElement(kind, content, where) {
  var x = document.createElement(kind);
  x.textContent = content;
  where.appendChild(x);
}

function loadDetails() {
  // to load restaurant information into the DOM.
  if (selectedRest) {
    restName.textContent = selectedRest.name;
    address.textContent = selectedRest.address;
    phone.textContent = selectedRest.phone;
    type.textContent = selectedRest.type;
    rating.textContent = selectedRest.reviews[0].rating;
    cost.textContent = selectedRest.reviews[0].cost;
    gfc.textContent = selectedRest.reviews[0].code;
    // for(var i = 0; i < selectedRest.reviews; i++) {
    buildElement('li', '"' + selectedRest.reviews[0].comment + '"', ulEl);
    // }
  }
};

checkLocalStorage();
loadDetails();

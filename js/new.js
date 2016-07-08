'use strict';

var form = document.getElementById('add_restaurant');
var cuisineType1 = document.getElementById('cuisine1');
var cuisineType2 = document.getElementById('cuisine2');
var cuisineType3 = document.getElementById('cuisine3');

var autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['establishment']});

  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  console.dir(place);
  document.getElementById('rest_name').value = place.name;
  document.getElementById('rest_addy').value = place.formatted_address;
  document.getElementById('rest_phone').value = place.formatted_phone_number;
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

function handleAddRest(event) {
  event.preventDefault();

  var cuisinesArray = [];

  console.log(event);
  console.log('this is a string');

  var newName = event.target.rest_name.value;
  var newAddress = event.target.rest_addy.value;
  var newPhone = event.target.rest_phone.value;
  var newVegan = event.target.vegan_check.checked;
  var addType1 = event.target.cuisine1.value;
  var addType2 = event.target.cuisine2.value;
  var addType3 = event.target.cuisine3.value;
  var newType = event.target.new_cuisine.value;

  if(!checkVsFoodTypes(newType) && newType !== '') {
    cuisinesArray.push(newType);
  };

  if(addType2 === addType1) {
    if(addType1 && addType1 !== 'Add a kind of food') {
      cuisinesArray.push(addType1);
    };
  } else {
    if(addType1 && addType1 !== 'Add a kind of food') {
      cuisinesArray.push(addType1);
    }
    if(addType2 && addType2 !== 'Add a kind of food'){
      cuisinesArray.push(addType2);
    }
  }

  if(addType3 !== addType1 && addType3 !== addType2) {
    if(addType3 && addType3 !== 'Add a kind of food') {
      cuisinesArray.push(addType3);
    }
  }

  cuisinesArray.sort();

  if(cuisinesArray.length < 1) {
    alert('Add at least one food type, you lazy bum!');
  } else {
    addNewRest(newName, newAddress, newPhone, cuisinesArray, newVegan, 'img/delicious.jpg');
    window.location.href = 'location.html';
  }
};

//Build food type dropdowns
var populateTypeList = function(target) {
  typesOfFood.sort();
  for(var i = 0; i < typesOfFood.length; i++) {
    buildNewElement('option', typesOfFood[i], target, 'value', typesOfFood[i]);
  }
};

// Check if a type of food is already in the typesOfFood array
var checkVsFoodTypes = function(input) {
  for(var i = 0; i < typesOfFood.length; i++) {
    if(typesOfFood[i] === input.toLowerCase()) {
      return true;
    }
  }
  return false;
};

form.addEventListener('submit', handleAddRest);

populateTypeList(cuisineType1);
populateTypeList(cuisineType2);
populateTypeList(cuisineType3);

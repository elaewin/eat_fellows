'use strict';


var form = document.getElementById('add_restaurant');
var cuisineType1 = document.getElementById('cuisine1');
var cuisineType2 = document.getElementById('cuisine2');
var cuisineType3 = document.getElementById('cuisine3');

//review variables
var uname_r = document.getElementById('username');
var fave_r = document.getElementById('fav_item');
var code_r = document.getElementById('code_check');
var cost_r = document.getElementById('cost_drp');
var rate_r = document.getElementById('rating_drp');
var comments_r = document.getElementById('review');
var submit = document.getElementById('submitReviewBtn');
var divAddNew = document.getElementById('add_new_review');

function handleAddRest(event) {
  event.preventDefault();

  var cuisinesArray = [];

  console.log(event);
  console.log('this is a string');

  var newName = event.target.rest_name.value;
  var newAddress = event.target.rest_addy.value;
  var newPhone = event.target.rest_phone.value;
  var newVegan = event.target.vegan_check.value;
  var newImage = event.target.rest_image.value;
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
  console.log('cuisinesArray', cuisinesArray);

  addNewRest(newName, newAddress, newPhone, cuisinesArray, newVegan, 'img/delicious.jpg');
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

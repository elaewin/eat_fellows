'use strict';

var cuisinesArray = [];

var restName = document.getElementById('rest_name');
var restPhone = document.getElementById('rest_phone');
var restAddy = document.getElementById('rest_addy');
var restPic = document.getElementById('rest_image');
var cuisine1 = document.getElementById('cuisine1');
var cuisine2 = document.getElementById('cuisine2');
var cuisine3 = document.getElementById('cuisine3');
var newCuisine = document.getElementById('new_cuisine');
var isVegan = document.getElementById('vegan_check');

//review variables
var uname_r = document.getElementById('username');
var fave_r = document.getElementById('fav_item');
var code_r = document.getElementById('code_check');
var cost_r = document.getElementById('cost_drp');
var rate_r = document.getElementById('rating_drp');
var comments_r = document.getElementById('review');
var submit = document.getElementById('submitReviewBtn');
var divAddNew = document.getElementById('add_new_review');

var handleAddRest = function() {
  event.preventDefault();

  var newName = event.target.restName.value;
  var newAddress = event.target.restAddy.value;
  var newPhone = event.target.restPhone.value;
  var newVegan = event.target.isVegan.value;
  var newImage = event.target.restPic.value;

  

  checkVsFoodTypes(event.target.cuisine1.value);
  checkVsFoodTypes(event.target.cuisine2.value);
  checkVsFoodTypes(event.target.cuisine3.value);
  checkVsFoodTypes(event.target.newCuisine.value);

  // addNewRest(name, address, phone, types, vegan, image)
};

var populateTypeList = function(target) {
  typesOfFood.sort();
  for(var i = 0; i < typesOfFood.length; i++) {
    buildNewElement('option', typesOfFood[i], target, 'value', typesOfFood[i]);
  }
};

var checkVsFoodTypes = function(input) {
  var inArray = false;
  for(var i = 0; i < typesOfFood.length; i++) {
    if(typesOfFood[i] === input) {
      return input;
}

submit_rest_btn.addEventListener('click', handleAddRest);

populateTypeList(cuisine1);
populateTypeList(cuisine2);
populateTypeList(cuisine3);

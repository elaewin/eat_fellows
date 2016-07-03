'use strict';
// ++ Global Variables ++
var map;  //google map object
var geocoder;  //used for addy lookup, see test repo
var typesOfFood = [];   //list which is generated to contain a list of every food category
var cfLoc = {lat: 47.618278, lng: -122.351841}; //location of CF

//++-------------++
//++ Google maps ++
function initMap() {
// this func is called in the google link in the HTML, we don't need to call it in main()
  geocoder = new google.maps.Geocoder();
  var cfIcon = 'img/cfIcon.png';

  map = new google.maps.Map(document.getElementById('map'), {
    center: cfLoc,
    scrollwheel: false,
    zoom: 16
  });

  var marker = new google.maps.Marker({
    map: map,
    icon: cfIcon, //custom icon for CF
    position: cfLoc,
    title: 'Code Fellows'
  });
}

//++----------++
// ++ Sorting ++
// Some functions take the objList as a parameter so that later on we can implement multi-variable sorting using the second sort on a subset of [restaurants]
function sortByMaxCost(objList, value) {
  tmp = [];
  for (var i = 0; i < objList.length; i++) {
    if (objList[i].avgCost() <= value) {
      tmp.push(objList[i]);
    }
  }
  return tmp;
}

function sortByMinRating(objList, value) {
  tmp = [];
  for (var i = 0; i < objList.length; i++) {
    if (objList[i].avgRating() >= value) {
      tmp.push(objList[i]);
    }
  }
  return tmp;
}

function sortByCode(objList, goodToCode) {
  tmp = [];
  for (var i = 0; i < objList.length; i++) {
    if (objList[i].goodToCode() === goodToCode) {
      tmp.push(objList[i]);
    }
  }
  return tmp;
}

function sortByType(type) {
  tmp = [];
  for (var i = 0; i < restaurants.length; i++) {
    for (var j = 0; j < restaurants.length; j++) {
      if (restaurants[i].type[j] === type) {
        tmp.push(restaurants[i]);
        break;
      }
    }
  }
  return tmp;
}

//++-------------------------++
// ++ Program Flow Functions ++
function initializeData() {
  if (localStorage.eatFellows) {
    restaurants = JSON.parse(localStorage.eatFellows);
    console.log('localStorage for eatFellows exists.');
  } else {
    restaurants = [fivePointCafe, bangBangCafe, cherryStCoffee, dripCity, modPizza, plumPantry, premMeatPies, quincysBurg, sportBar, streetBean, tacoDelMar, thaiOnOne, uptownExpresso, worldClassCoffee];
    console.log('localStorage for eatFellows not found, original dataset loaded.');
  }
  updateTypes();
}

function updateTypes() {
// updates the types of food list for the website for ppl to sort with
  for (var i = 0; i < restaurants.length; i++) {
    for (var j = 0; j < restaurants[i].type.length; j++) {
      if (typesOfFood.indexOf(restaurants[i].type[j]) === -1) { //if not in list, append it
        typesOfFood.push(restaurants[i].type[j]);
      }
    }
  }
  console.log('types of food updated');
}

//++-------------------------------++
//++ Data manipulation/debug tools ++
function removeRestaurant(name) {
// removes a restaurant from the dataset in memory
  for (var i = 0; i < restaurants.length; i++) {
    if (restaurants[i].name === name) {
      restaurants.splice(i, 1);
    }
  }
}

function addTestRestaurant(name, types) {
// creates a bogus vegan Restaurant to quickly test (types is an array of strings)
  tmp = new Restaurant(name, '3000 1st Ave S', types, true);
  tmp.reviews = [new Review('Anonymous (test)', 'A test boiga!', 0, 2, 2)];
  tmp.reviews[0].comment = 'This is a test.  Blah blah blah';
  restaurants.push(tmp);
  updateTypes();
}

//++-------++
// ++ Main ++
function main() {
// main program loop - step by step of program - should only be funcs in here
  initializeData();
}

main();

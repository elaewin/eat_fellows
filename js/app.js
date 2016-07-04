'use strict';
// ++ Global Variables ++
var typesOfFood = [];   //list which is generated to contain a list of every food category

var typeList = [];  //Array of Restaurant objs that meet search criteria by type
var costList = [];  // Same for cost..etc.
var ratingList = [];
var codeList = [];

var map;  //google map object
var geocoder;  //used for addy lookup, see test repo
var markers = []; //Array of all markers for the map
var cfLoc = {lat: 47.618278, lng: -122.351841}; //location of CF

//++-------------++
//++ Google maps ++
function initMap() {
// this func is called in the google link in the HTML, we don't need to call it in main()
  map = new google.maps.Map(document.getElementById('map'), {
    center: cfLoc,
    scrollwheel: false,
    zoom: 15
  });
  buildMarkers(restaurants);
}

function buildMarkers(markerList) {
// Builds the markers on the map
  clearScreen();
  var cfIcon = 'img/cfIcon.png';
  var cfmarker = new google.maps.Marker({
    map: map,
    icon: cfIcon, //custom icon for CF
    position: cfLoc,
    title: 'Code Fellows'
  });
//This is convoluted looking, but basically creates a delay for geocode to work correctly
  var l = 0;
  function markerLoop(markerList) {
    setTimeout(function() {
      createMarker(markerList[l].name, markerList[l].address);
      if (l < markerList.length) {
        markerLoop(markerList);
        l++;
      }
    }, 200);
  }
  markerLoop(markerList);
}

function createMarker(name, address) {
// Builds one marker
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
        var infowindow = new google.maps.InfoWindow(
             { content: name + ' at ' + address,
               size: new google.maps.Size(150,50)
             });

        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: name
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      } else {
        alert('Location not found.');
      }
    }
  });
}

function clearScreen() {
// Clears markers from map
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

//++----------++
// ++ Sorting ++
// The functions take the objList as a parameter so that later on we can implement multi-variable sorting using the second sort on a subset of [restaurants]
// Multivar ex: newlist = sortByMaxCost(sortByType(restaurants, 'Coffee'), 1);
// Each sort returns a list of Restaurant objects
function sortByMaxCost(objList, value) {
  var tmp = [];
  for (var i = 0; i < objList.length; i++) {
    if (objList[i].avgCost() <= value) {
      tmp.push(objList[i]);
    }
  }
  return tmp;
}

function sortByMinRating(objList, value) {
  var tmp = [];
  for (var i = 0; i < objList.length; i++) {
    if (objList[i].avgRating() >= value) {
      tmp.push(objList[i]);
    }
  }
  return tmp;
}

function sortByCode(objList, goodToCode) {
  var tmp = [];
  for (var i = 0; i < objList.length; i++) {
    if (objList[i].goodToCode() === goodToCode) {
      tmp.push(objList[i]);
    }
  }
  return tmp;
}

function sortByType(objList, type) {
  var tmp = [];
  for (var i = 0; i < objList.length; i++) {
    for (var j = 0; j < objList.length; j++) {
      if (objList[i].type[j] === type) {
        tmp.push(objList[i]);
        break;
      }
    }
  }
  return tmp;
}
//++-------------++
// ++ event functions for search ++
// input: value from webpage sorting elements after they change
// output: updated matching array
function typeClick(type) {
  if (type) {
    typeList = sortByType(restaurants, type);
    updateResults();
  }
}

function costClick(cost) {
  if (cost) {
    costList = sortByMaxCost(restaurants, cost);
    updateResults();
  }
}

function ratingClick(rating) {
  if (rating) {
    ratingList = sortByMinRating(restaurants, rating);
    updateResults();
  }
}

function codeClick(code) {
  if (code) {
    codeList = sortByCode(restaurants, code);
    updateResults();
  }
}

function updateResults() {
// updates the results and then loc markers after search item chosen
  var results = [];
  for (var i = 0; i < typeList.length; i++) {
    if (costList.indexOf(typeList[i]) != -1 && ratingList.indexOf(typeList[i]) != -1 && codeList.indexOf(typeList[i]) != -1) {
      results.push(typeList[i]);
    }
  }
  console.log(results);
  buildMarkers(results);
}
//put eventListeners right in here --

//++-------------------------++
// ++ Program Flow Functions ++
function initializeData() {
// gets data from storage or dataset
  if (localStorage.eatFellows) {
    restaurants = JSON.parse(localStorage.eatFellows);
    console.log('localStorage for eatFellows exists.');
  } else {
    restaurants = [fivePointCafe, bangBangCafe, cherryStCoffee, modPizza, plumPantry, premMeatPies, quincysBurg, sportBar, streetBean, tacoDelMar, thaiOnOne, uptownExpresso, worldClassCoffee];
    console.log('localStorage for eatFellows not found, original dataset loaded.');
  }
  updateTypes();
  typeList = restaurants;
  costList = restaurants;
  ratingList = restaurants;
  codeList = restaurants;
}

function updateTypes() {
// updates the types of food list for the website <options> for ppl to sort with
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
  initMap();
}

main();

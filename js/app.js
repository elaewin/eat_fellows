'use strict';
// ++ Global Variables ++
var typesOfFood = [];   //list which is generated to contain a list of every food category

var typeList = [];  //Array of Restaurant objs that meet search criteria by type
var costList = [];  // Same for cost..etc.
var ratingList = [];
var codeList = [];

var typeBox = document.getElementById('type_dd');
var costBox = document.getElementById('cost_dd');
var checkBox = document.getElementById('code_cb');

var map;  //google map object
var markers = []; //Array of all markers for the map
var cfLoc = {lat: 47.618278, lng: -122.351841}; //location of CF
var tooltips = []; //Array of infowindows to keep only 1 open

var showAll = document.getElementById('show_all');
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

// Builds the markers on the map
function buildMarkers(markerList) {
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
      if (l < markerList.length) {
        createMarker(markerList[l].name, markerList[l].address);
        l++;
        markerLoop(markerList);
      } else {
        markers = offsetLocs(markers);  // deal with same-spot markers
      }
    }, 300);
  }
  markerLoop(markerList); //show markers
}

// Builds one marker
function createMarker(name, address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {

        var contentString = '<div class="tooltip">' + '<h4>' + name + '</h4>' + '<p>' + address + '</p>' + '<a href="location.html"><button>More Info</button></a>' + '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        // var forkAndKnife = 'img/fork_and_knife.png';
        // var drumstick = 'img/drumstick.png'

        var marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          // icon: drumstick,
          title: name
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
          if (tooltips.length > 0) {  //closes previous infowindows open
            tooltips.push(infowindow);
            tooltips[0].close();
            tooltips.splice(0,1);

          } else {
            tooltips.push(infowindow);
          }
          handleRestSelect(name);
          tooltips[0].open(map, marker);
        });
      } else {
        alert('Location not found.');
      }
    }
  });
}

// Clears markers from map
function clearScreen() {
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
function sortByName(objList) {
  var tmp = [];
  var returnArray = [];
  for (var i = 0; i < objList.length; i++) {
    tmp.push(objList[i].name);
  }
  tmp.sort();
  for (var j = 0; j < tmp.length; j++) {
    for (var k = 0; k < objList.length; k++) {
      if (tmp[j] === objList[k].name) {
        returnArray.push(objList[k]);
        break;
      }
    }
  }
  return returnArray;
}

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
  if (goodToCode === true) {
    for (var i = 0; i < objList.length; i++) {
      if (objList[i].goodToCode() === true) {
        tmp.push(objList[i]);
      }
    }
  } else {
    tmp = objList;
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
  if (type === 'all') {
    tmp = objList;
  }
  return tmp;
}
//++-------------++
// ++ event handlers for search ++
// input: value from webpage sorting elements after they change
// output: updated matching array (no return)
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
  codeList = sortByCode(restaurants, code);
  updateResults();
}

// updates the results and then loc markers after search item chosen
function updateResults() {
  var results = [];
  for (var i = 0; i < typeList.length; i++) {
    if (costList.indexOf(typeList[i]) != -1 && ratingList.indexOf(typeList[i]) != -1 && codeList.indexOf(typeList[i]) != -1) {
      results.push(typeList[i]);
    }
  }
  map.setCenter(cfLoc);
  buildMarkers(results);
}

var handleRestSelect = function(name) {
  for(var i = 0; i < restaurants.length; i++) {
    if(restaurants[i].name === name) {
      console.log('clicked on', restaurants[i].name);
      localStorage.storedSelection = JSON.stringify(restaurants[i]);
    }
  }
};

var removeStoredSelection = function() {
  if (localStorage.storedSelection) {
    localStorage.removeItem('storedSelection');
  }
};

// search event listeners
function listenForEvents() {
  try {
    toggler('flyout', 'flyout_label', 'active');  //Activate out flyout menu
    costBox.addEventListener('change', function() {
      costClick(costBox.value);
    }, false);
    typeBox.addEventListener('change', function() {
      typeClick(typeBox.value);
    }, false);
    checkBox.addEventListener('click', function() {
      codeClick(checkBox.checked);
    }, false);
  } catch(error) {
  }
}

show_all.addEventListener('click', removeStoredSelection);

//++-------------------------++
// ++ Program Flow Functions ++

// gets data from storage or dataset
function initializeData() {
  if (localStorage.eatFellows) {
    restaurants = JSON.parse(localStorage.eatFellows);
// re-attach methods
    for (var i = 0; i < restaurants.length; i++) {
      restaurants[i].avgRating = function() {
        return getAverage(this.reviews, 'rating');
      };
      restaurants[i].avgCost = function() {
        return getAverage(this.reviews, 'cost');
      };
      restaurants[i].goodToCode = function() {
        x = getAverage(this.reviews, 'code');
        if (x >= 0.5) {
          return true;
        } else {
          return false;
        }
      };
    }
    console.log('localStorage for eatFellows exists.');
  } else {
    restaurants = [fivePointCafe, bangBangCafe, cherryStCoffee, modPizza, plumPantry, premMeatPies, quincysBurg, sportBar, streetBean, tacoDelMar, thaiOnOne, uptownExpresso, worldClassCoffee];
    console.log('localStorage for eatFellows not found, original dataset loaded.');
  }
  restaurants = sortByName(restaurants);
  updateTypes();
  typeList = restaurants;
  costList = restaurants;
  ratingList = restaurants;
  codeList = restaurants;
}

// updates the types of food list for the website <options> for ppl to sort with
function updateTypes() {
  for (var i = 0; i < restaurants.length; i++) {
    for (var j = 0; j < restaurants[i].type.length; j++) {
      if (typesOfFood.indexOf(restaurants[i].type[j].toLowerCase()) === -1) { //if not in list, append it
        typesOfFood.push(restaurants[i].type[j].toLowerCase());
      } //toLowerCase so that there wont be Thai and thai after new restaurant added
    }
  }
  typesOfFood.sort();
  // buildElements here
  if (typeBox) {
    for (var i = 0; i < typesOfFood.length; i++) {
      var el = buildElement('option', typesOfFood[i], typeBox, true);
      el.setAttribute('value', typesOfFood[i]);
    }
  }
}

// ++ Useful funcs ++
// Builds an HTML element, returnVal is boolean
function buildElement(elType, content, parentNode, returnVal) {
  var tmp = document.createElement(elType);
  if (content) {
    tmp.textContent = content;
  }
  parentNode.appendChild(tmp);
  if (returnVal) {
    return tmp;
  }
}

// inserts a substring into str after index
function insertSubStr(index, str, substr) {
  if (index > 0) {
    return str.slice(0, index) + substr + str.slice(index, str.length);
  }
}

// formats user input
// function formatInputText(uinput) {
// }

//++-------------------------------++
//++ Data manipulation/debug tools ++

// removes a restaurant from the dataset in memory
function removeRestaurant(name) {
  for (var i = 0; i < restaurants.length; i++) {
    if (restaurants[i].name === name) {
      restaurants.splice(i, 1);
    }
  }
}

// creates a bogus vegan Restaurant to quickly test (types is an array of strings)
function addTestRestaurant(name, types) {
  tmp = new Restaurant(name, '3000 1st Ave S', types, true);
  tmp.reviews = [new Review('Anonymous (test)', 'A test boiga!', 0, 2, 2)];
  tmp.reviews[0].comment = 'This is a test.  Blah blah blah';
  restaurants.push(tmp);
  updateTypes();
}

//++-------++
// ++ Main ++
// main program loop - step by step of program - should only be funcs in here
function main() {
  initializeData();
  listenForEvents();
}

main();

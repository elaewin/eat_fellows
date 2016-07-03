var map;
var cfLoc = {lat: 47.618278, lng: -122.351841}; //location of CF
var geocoder;  //used for addy lookup, see test repo
var typesOfFood = [];

//++ Google maps
function initMap() {
  //this func is called in the google link in the HTML
  geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById('map'), {
    center: cfLoc,
    scrollwheel: false,
    zoom: 16
  });

  var marker = new google.maps.Marker({
    map: map,
    position: cfLoc,
    title: 'Code Fellows'
  });
}
//++--------------++

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
//updates the types of food list for the website for ppl to choose from
  for (var i = 0; i < restaurants.length; i++) {
    for (var j = 0; j < restaurants[i].type.length; j++) {
      if (typesOfFood.indexOf(restaurants[i].type[j]) === -1) { //if not in list, append it
        typesOfFood.push(restaurants[i].type[j]);
      }
    }
  }
}

//++ Data manipulation debug tools
function removeRestaurant(name) {
// removes a restaurant from the dataset in memory
  for (var i = 0; i < Restaurants.length; i++) {
    if (restaurants[i].name = name) {
      restaurants.splice(i, 1);
    }
  }
}

function addTestRestaurant(name, types) {
//creates a bogus Restaurant to quickly test (types is an array of strings)
  tmp = new Restaurant(name, '3000 1st Ave S', types, true);
  tmp.reviews = new Review('Anonymous (test)', 'A test boiga!', 0, 2, 2);
  restaurants.push(tmp);
  updateTypes();
}

function main() {
//main program loop
  initializeData();
}

main();

var map;
var cfLoc = {lat: 47.618278, lng: -122.351841}; //location of CF
var geocoder;  //used for addy lookup, see test repo

function initializeData() {
  if (localStorage.eatFellows) {
    Restaurants = JSON.parse(localStorage.eatFellows);
    console.log('localStorage for eat fellows exists');
  } else {
    Restaurants = [fivePointCafe, bangBangCafe, cherryStCoffee, dripCity, modPizza, plumPantry, premMeatPies, quincysBurg, sportBar, streetBean, tacoDelMar, thaiOnOne, uptownExpresso, worldClassCoffee];
  }
}

function initMap() {
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

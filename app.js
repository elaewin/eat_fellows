var map;
var cfLoc = {lat: 47.618278, lng: -122.351841}; //location of CF
var geocoder;  //used for addy lookup, see test repo

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

function randoSpider(listOfMarkers) {
// used to offset lat/lng on markers w/ exact same location
  var lats = [];
  var lngs = [];
  for (var i = 0; i < listOfMarkers.length; i++) {
    lats.push(listOfMarkers[i].getPosition().lat());
    lngs.push(listOfMarkers[i].getPosition().lng());
  }
  for (var j = 0; j < listOfMarkers.length; j++) {
    for (var k = 0; k < listOfMarkers.length; k++) {
      if (listOfMarkers[j].getPosition().toString() === listOfMarkers[k].getPosition().toString() && j != k) {
        var point = new google.maps.LatLng(listOfMarkers[j].getPosition().lat() + getRandoOffset(.00003, .00016), listOfMarkers[j].getPosition().lng() + getRandoOffset(.00003, .00016));
        listOfMarkers[j].setPosition(point);
      }
    }
  }
}

//gets random number in range positive OR negative
function getRandoOffset(min, max) {
  var tmp = Math.random() * (max - min) + min;
  var tmp2 = Math.round(Math.random());
  if (tmp2 === 0) {
    return (tmp * -1);
  } else {
    return tmp;
  }
}

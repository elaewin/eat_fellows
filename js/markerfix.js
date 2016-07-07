function randoSpider(listOfMarkers) {
// used to offset lat/lng on markers w/ exact same location
  var offsets = [[0.00015, 0],[0, 0.00015],[-0.00015, 0],[0, -0.00015],[0.00015, 0.00015],[-0.00015,0.00015],[-0.00015, -0.00015],[0.00015,-0.00015]];
  var lats = [];
  var lngs = [];
  var tmp = [];
  sameLocMarkerIndices = [];
  for (var i = 0; i < listOfMarkers.length; i++) {
    lats.push(listOfMarkers[i].getPosition().lat());
    lngs.push(listOfMarkers[i].getPosition().lng());
  }
  for (var j = 0; j < listOfMarkers.length; j++) {
    tmp = [];
    for (var k = 0; k < listOfMarkers.length; k++) {
      if (listOfMarkers[j].getPosition().toString() === listOfMarkers[k].getPosition().toString() && j != k) {
        tmp.push(k);
      }
    }
    sameLocMarkerIndices.push(tmp);
  }
  var x, y;
  for (var k = 0; k < sameLocMarkerIndices.length; k++){
    for (var l = 0; l < sameLocMarkerIndices[k].length; l++) {
      x = listOfMarkers[sameLocMarkerIndices[k][l]].getPosition().lat();
      y = listOfMarkers[sameLocMarkerIndices[k][l]].getPosition().lng();
      x += offsets[l][0];
      y += offsets[l][1];
      var point = new google.maps.LatLng(x,y);
      listOfMarkers[l].setPosition(point);
    }
  }
  return listOfMarkers;
}
var point = new google.maps.LatLng(listOfMarkers[j].getPosition().lat() + offsets[l][0], listOfMarkers[j].getPosition().lng() + offsets[l][1]);

var point = new google.maps.LatLng(listOfMarkers[j].getPosition().lat() + getRandoOffset(.00003, .00016), listOfMarkers[j].getPosition().lng() + getRandoOffset(.00003, .00016));
listOfMarkers[j].setPosition(point);

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

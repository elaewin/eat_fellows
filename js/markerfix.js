function offsetLocs(listOfMarkers) {
// used to separate up to 9 lat/lng markers w/ exact same location
  d = 0.00015; //Amount lat/lng to offset by (1.5 factor corrects lat/lng scale difference)
  var offsets = [[d / 1.5, 0],[0, d],[-d / 1.5, 0],[0, -d],[d / 1.5, d],[-d / 1.5, d],[-d / 1.5, -d],[d / 1.5, -d]];
  var rMarkers = [];
  var newEntry = true;
  //find repeated loc markers and put indices into arrays
  for (var i = 0; i < listOfMarkers.length; i++) {
    var tmp = [];
    tmp.push(i);
    for (var j = 0; j < listOfMarkers.length; j++) {
      if (listOfMarkers[i].getPosition().toString() === listOfMarkers[j].getPosition().toString() && i != j) {
        tmp.push(j);
      }
    }
    tmp = tmp.sort(); //sort for comparisons later
    rMarkers.push(tmp);
  }
  //get rid of no-matches arrays
  for (var k = 0; k < rMarkers.length; k++) {
    if (rMarkers[k].length === 1) {
      rMarkers.splice(k, 1);
      k--;
    }
  }
  //remove duplicate arrays of matches
  for (var l = 0; l < rMarkers.length; l++) {
    for (var m = 0; m < rMarkers.length; m++) {
      if (JSON.stringify(rMarkers[l]) === JSON.stringify(rMarkers[m]) && l != m) {
        rMarkers.splice(m, 1);
        m--;
      }
    }
  }

// apply loc offsets for remaining match arrays
  var x, y;
  for (var k = 0; k < rMarkers.length; k++){
    for (var l = 1; l < rMarkers[k].length; l++) {
      x = listOfMarkers[rMarkers[k][l]].getPosition().lat() + offsets[l][0];
      y = listOfMarkers[rMarkers[k][l]].getPosition().lng() + offsets[l][1];
      var point = new google.maps.LatLng(x,y);
      listOfMarkers[rMarkers[k][l]].setPosition(point);
    }
  }
  return listOfMarkers;
}

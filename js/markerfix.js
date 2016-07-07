//This function was created to separate up to 9 lat/lng on markers w/ exact same location from a list of markers which contain some location duplicates
// future: use # of markers to calc points on a circle and generate offsets list with trigonometry

function offsetDuplicates(listOfMarkers) {
  d = 0.00015; //Amount lat/lng to offset by
  var offsets = [[d / 1.5, 0],[0, d],[-d / 1.5, 0],[0, -d],[d / 1.5, d],[-d / 1.5, d],[-d / 1.5, -d],[d / 1.5, -d]];
  var rMarkers = [];
  var newEntry = true;
  //create 2-d array of matching markerList marker indices
  for (var i = 0; i < listOfMarkers.length; i++) {
    var tmp = [];
    tmp.push(i);
    for (var j = 0; j < listOfMarkers.length; j++) {
      if (listOfMarkers[i].getPosition().toString() === listOfMarkers[j].getPosition().toString() && i != j) {
        tmp.push(j);
      }
    }
    tmp = tmp.sort();
    rMarkers.push(tmp);
  }
  //remove unique marker arrays
  for (var k = 0; k < rMarkers.length; k++) {
    if (rMarkers[k].length === 1) {
      rMarkers.splice(k, 1);
      k--;
    }
  }
  //remove duplicates of match arrays
  for (var l = 0; l < rMarkers.length; l++) {
    for (var m = 0; m < rMarkers.length; m++) {
      if (JSON.stringify(rMarkers[l]) === JSON.stringify(rMarkers[m]) && l != m) {
        rMarkers.splice(m, 1);
        m--;
      }
    }
  }

// apply loc offsets to markers with same location
  var x, y;
  for (var k = 0; k < rMarkers.length; k++){
    for (var l = 1; l < rMarkers[k].length; l++) {
      x = listOfMarkers[rMarkers[k][l]].getPosition().lat();
      y = listOfMarkers[rMarkers[k][l]].getPosition().lng();
      x += offsets[l][0];
      y += offsets[l][1];
      var point = new google.maps.LatLng(x,y);
      listOfMarkers[rMarkers[k][l]].setPosition(point);
    }
  }
  return listOfMarkers;
}

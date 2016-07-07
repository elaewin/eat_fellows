// attribute to instructor Brian
function toggler(id1, label, state) {
  // grab elements
  var container = document.getElementById(id1);
  var text = document.getElementById(label);
  var form = document.getElementById('flyout_form');
  var checkbox = document.getElementById('code_cb');
  var labels = document.getElementsByClassName('flyout_text');
  var typeDD = document.getElementById('type_dd');
  var costDD = document.getElementById('cost_dd');

  // init active state
  container.addEventListener('mouseover', function() {
    text.style.display = 'none';
    this.setAttribute('class', state);
    this.style.cursor = 'auto';
    form.style.display = 'block';
    checkbox.style.display = 'inline-block';
    typeDD.style.display = 'block';
    costDD.style.display = 'block';
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = 'block';
    }
  });

  // init inactive state
  container.addEventListener('mouseout', function() {
    this.removeAttribute('class', state);
    form.style.display = 'none';
    checkbox.style.display = 'none';
    typeDD.style.display = 'none';
    costDD.style.display = 'none';
    text.style.display = 'block';
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.display = 'none';
    }
  });
}

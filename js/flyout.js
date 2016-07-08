// attribute to instructor Brian
var container = document.getElementById('flyout');
var text = document.getElementById('flyout_label');
var form = document.getElementById('flyout_form');
var checkbox = document.getElementById('code_cb');
var labels = document.getElementsByClassName('flyout_text');
var typeDD = document.getElementById('type_dd');
var costDD = document.getElementById('cost_dd');
function toggler(state) {
  container.addEventListener('mouseover', activateMenu);
  container.addEventListener('mouseout', deactivateMenu);
}

function activateMenu() {
  allowClose = false;
  text.style.display = 'none';
  container.setAttribute('class', 'active');
  container.style.cursor = 'auto';
  form.style.display = 'block';
  checkbox.style.display = 'inline-block';
  typeDD.style.display = 'block';
  costDD.style.display = 'block';
  for (var i = 0; i < labels.length; i++) {
    labels[i].style.display = 'block';
  }
}

function deactivateMenu() {
  container.removeAttribute('class', 'active');
  form.style.display = 'none';
  checkbox.style.display = 'none';
  typeDD.style.display = 'none';
  costDD.style.display = 'none';
  text.style.display = 'block';
  for (var i = 0; i < labels.length; i++) {
    labels[i].style.display = 'none';
  }
}

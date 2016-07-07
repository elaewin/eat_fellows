var restaurants = []; //Array of all restaurant objects,filled from localStorage or initial dataset

function Restaurant(name, address, phone, type, vegan, image) {
  this.name = name;
  this.address = address;
  this.phone = phone;
  this.type = type; // Array of types of food
  this.vegan = vegan; //If it has KNOWN vegan options for an entree (sides don't count, it would suck if you were looking for a vegan place that only had a side of broccoli or something
  //also, by default I am listing coffee joints as false for vegan, since I think vegan applies more towards food, and if they select coffee from search, vegan checkbox disappears
  this.image = image;
  this.reviews = [];
  //to do:  add img property with img path for the restaurant;

// Methods
  this.avgRating = function() {
    return getAverage(this.reviews, 'rating');
  };
  this.avgCost = function() {
    return getAverage(this.reviews, 'cost');
  };
  this.goodToCode = function() {
    x = getAverage(this.reviews, 'code');
    if (x >= 0.5) {
      return true;
    } else {
      return false;
    }
  };
}

function getAverage(ObjsToAvg, property) {
// gets the average value from an array of objects(ObjsToAvg) with a property of interest
  var sum = 0;
  for (var i = 0; i < ObjsToAvg.length; i++) {
    sum += ObjsToAvg[i][property];
  }
  if (ObjsToAvg.length) {
    return sum / ObjsToAvg.length;
  } else {
    return -1;  //error code
  }
}

var fivePointCafe = new Restaurant('Five Point Cafe', '415 Cedar Street, Seattle, WA', '206-448-9991', ['american', 'breakfast', 'beer'], false, 'img/5point.jpg');
var bangBangCafe = new Restaurant('Bang Bang Cafe', '2460 Western Ave, Seattle, WA', '206-448-2233', ['breakfast', 'mexican', 'sandwiches'], true, 'img/bangbang.jpg');
var cherryStCoffee = new Restaurant('Cherry Street Coffee', '2621 5th Ave, Seattle, WA', '206-812-1298', ['coffee'], false, 'img/cherrystreet.jpg');
var modPizza = new Restaurant('Mod Pizza', '305 Harrison St., Seattle, WA', '206-428-6315', ['pizza', 'beer'], true, 'img/mod.jpg');
var plumPantry = new Restaurant('Plum Pantry', '305 Harrison St., Seattle, WA', '206-428-6337', ['healthy', 'salad', 'vegan'], true, 'img/plum.jpg');
var premMeatPies = new Restaurant('Premier Meat Pies', '305 Harrison St., Seattle, WA', '206-428-6280', ['pie', 'beer'], false, 'img/meatpies.jpg');
var quincysBurg = new Restaurant('Quincy\'s Charbroiled Burgers', '305 Harrison St., Seattle, WA', '206-728-2228', ['american', 'seafood', 'beer'], false, 'img/quincy.jpg');
var sportBar = new Restaurant('Sport Restaurant & Bar', '140 4th Ave N, Seattle, WA', '206-404-7767', ['american', 'pizza', 'beer'], false, 'img/sport.jpg');
var streetBean = new Restaurant('Street Bean Coffee', '2711 3rd Ave Seattle, WA', '206-708-6803', ['coffee'], false, 'img/streetbean.jpg');
var tacoDelMar = new Restaurant('Taco Del Mar', '411 Cedar Street Seattle, WA', '206-443-1000', ['mexican'], true, 'img/taco.jpg');
var thaiOnOne = new Restaurant('Thai on 1', '2904 1st Ave, Seattle, WA', '206-441-4348', ['thai', 'beer'], false, 'img/thai.jpg');
var uptownExpresso = new Restaurant('Uptown Expresso', '2801 Alaskan Way Seattle, WA', '206-770-7777', ['coffee'], false, 'img/uptown.jpg');
var worldClassCoffee = new Restaurant('World Class Coffee', '2819 2nd Ave, Seattle, WA 98121', '206-441-2967', ['sandwiches', 'teriyaki', 'coffee'], false, 'img/world.jpg');

fivePointCafe.reviews = [fivept1, fivept2];
bangBangCafe.reviews = [bang1];
cherryStCoffee.reviews = [cherry1];
modPizza.reviews = [mod1];
plumPantry.reviews = [plum1, plum2];
premMeatPies.reviews = [meat1];
quincysBurg.reviews = [quincy1];
sportBar.reviews = [sport1];
streetBean.reviews = [bean1, bean2];
tacoDelMar.reviews = [taco1];
thaiOnOne.reviews = [thai1, thai2, thai3];
uptownExpresso.reviews = [up1];
worldClassCoffee.reviews = [world1];

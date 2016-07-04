function Review(name, faveDish, code, cost, rating) {
  this.name = name; //name of reviewer
  this.faveDish = faveDish;
  this.code = code; //Good place to code?  0->no, 1->yes (so we can avg)
  this.cost = cost; // 1: <=$8, 2: $8-$12,  3: >$12
  this.rating = rating; // 1 to 5, 5 is awesome
  this.comment = '';
}

var fivept1 = new Review('Kris Skelton', 'Happy Hour Burger', 0, 3, 4);
fivept1.comment = 'It\'s a dive bar (I say this with love). I do not recommend ordering off of the menu during the day - wait for happy hour to score a cheap burger and fries, then wash down with a reasonably priced beer. There are no to-go orders for the happy hour menu, so plan to stay for a little while (and don\'t be in a hurry to pay your bill because the waitstaff ain\'t got time for your not having time).';

var fivept2 = new Review('David S', 'Cuban Sandwich', 0, 2, 3);
fivept2.comment = 'Your quintessential hipster dive bar.  Lively during lunch, semi-loud music, chill bartenders.  I was a little hungover, but the Cuban Sandwich gave me the strength to carry on and keep fighting the good fight.';

var bang1 = new Review('Instructor Brian', 'Chicken Chile Burrito', 0, 3, 5);
bang1.comment = 'It\'s a "meh" place to code. Possible but not ideal. Also - Bang Bang Cafe is straight up amazing. Everyone should eat there everyday for the rest of their lives.';

var cherry1 = new Review('Kris Skelton', '12oz iced Americano with heavy cream', 0, 2, 4);
cherry1.comment = 'There is one table that can accommodate four people, as I recall. I don\'t believe they have WiFi. I mostly go here because it\'s a reasonable walk from Code Fellows (15 min round trip). They serve sandwiches and light fare, and the pastries are good. The coffee is excellent and the regular staff are all really nice. Heavy cream is available upon request.';

var mod1 = new Review('Erica', 'Pizza with grilld asparagus', 0, 2, 3);
mod1.comment = 'Lines at lunch are crazy when the weather is nice.';

var plum1 = new Review('Alison Z', 'Jerk Tofu & Yam', 0, 3, 5);
plum1.comment = 'this restaurant is all vegan for the vegetarian/vegan coders';

var plum2 = new Review('Val', 'Kale salad with sweet potatoes', 1, 3, 4);
plum2.comment = 'Good healthy food. In the armory, free wifi, sit as long as you want.';

var meat1 = new Review('Erica', 'Steak and mushroom pie', 0, 3, 3);
meat1.comment = 'A little odd, but not bad for an American version of a savory pie.';

var quincy1 = new Review('Logan Rogers', 'The Quincy Burger', 0, 2, 3);
quincy1.comment = 'Located in the Armory at Seattle Center, Quincy\'s is a burger joint that also offers fried fish and chicken strips. The food is alright, perhaps not worth the walk from the Code Fellows campus, but they do offer beer, as well, which is a plus!';

var sport1 = new Review('Craig', 'Lucille IPA', 0, 3, 3);
sport1.comment = 'Well, they have beer!';

var bean1 = new Review('Val', 'latte', 1, 2, 5);
bean1.comment = 'Friendly staff. Great non-profit business model.';

var bean2 = new Review('Kris Skelton', '12oz iced Americano with room', 1, 2, 4);
bean2.comment = 'I imagine it would be a good place for pair/solo coding. Probably not great for a group. The pastries are really good, too. I appreciate their mission of helping street-affected youth learn a valuable skill. The only drawback is they don\'t have full fat heavy cream.';

var taco1 = new Review('Kris Skelton', 'Chicken Burrito with cilantro and lime', 0, 2, 4);
taco1.comment = 'It\'s TDM. If you haven\'t been in a while, the menu here is streamlined (and this may be across all Taco Del Mar locations) so you don\'t have the option of a Super Burrito. The simgular burrito option reminds me of the mondo. They aren\'t great about offering lettuce or other condiments aside from pico, so be sure to ask if there\'s something you want. Burrito comes out to about $8, including the 75 cent upcharge for guacamole.';

var thai1 = new Review('Doug Christ', 'Sweet and Sour Chicken', 1, 3, 3);
thai1.comment = 'not bad togo, but also a nice sit-down place too';

var thai2 = new Review('Val','green curry', 0, 2, 3);
thai2.comment = 'Food is good enough for a nearby place, nice quiet place.';

var thai3 = new Review('Kris Skelton', 'Masaman Curry with Chicken', 0, 2, 4);
thai3.comment = 'The tables here are set up for one or two people, and they\'re small. The service is slow (expect it to take 20 minutes for your order if no one else is in the restaurant). The food is on the pricey side (a la carte style). But it is so good! I really enjoyed their fresh rolls with shrimp, and the jasmine rice I ordered with my curry was just right (neither dried out or sticky).';

var up1 = new Review('Kris Skelton', 'Iced Americano with room', 0, 1, 1);
up1.comment = 'Super small location (hardly room to place one\'s order) so not a place to code. It\'s a nice walk down Broad and you\'ll get a little cardio walking back up the hill. They do have heavy cream on request.';

var world1 = new Review('Logan Rogers', 'Curry', 1, 2, 4);
world1.comment = 'World Class Coffee offers a large variety of foods from teriyaki, to sandwhiches, to a salad bar, and bubble tea! They have specials every day of the week, and my particular favorite is their Japanese style curry that they offer on Wednesdays!';

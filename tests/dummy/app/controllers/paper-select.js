import Ember from 'ember';

export default Ember.Controller.extend({

  userState: '',
  states: Ember.computed(function () {
    return ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });
  }),


  sizes: Ember.A([
    "small (12-inch)",
    "medium (14-inch)",
    "large (16-inch)",
    "insane (42-inch)"
  ]),

  toppings: Ember.A([
    { category: 'meat', name: 'Pepperoni' },
    { category: 'meat', name: 'Sausage' },
    { category: 'meat', name: 'Ground Beef' },
    { category: 'meat', name: 'Bacon' },
    { category: 'veg', name: 'Mushrooms' },
    { category: 'veg', name: 'Onion' },
    { category: 'veg', name: 'Green Pepper' },
    { category: 'veg', name: 'Green Olives' }
  ]),

  meatToppings: Ember.computed('toppings.@each', function () {
    return this.get('toppings').filter(function (item) { return item.category === 'meat'; });
  }),

  vegToppings: Ember.computed('toppings.@each', function () {
    return this.get('toppings').filter(function (item) { return item.category === 'veg'; });
  })

});

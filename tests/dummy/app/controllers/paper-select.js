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



  /**
   * Fake promise to fetch data, here you would use ember-data, jQuery.ajax or whatever you want.
   */
  onUserLoad: function () {
    var _self = this;
    return new Ember.RSVP.Promise(function(resolve) {
      // Just wait for 800ms to 2 seconds for a fake progress, so it feels like a query.
      var waitMS = Math.floor(Math.random() * 2000) + 800;

      var dataFromServer = Ember.A([
        { id: 1, name: 'Scooby Doo' },
        { id: 2, name: 'Shaggy Rodgers' },
        { id: 3, name: 'Fred Jones' },
        { id: 4, name: 'Daphne Blake' },
        { id: 5, name: 'Velma Dinkley' },
      ]);


      Ember.run.later(_self, function() {
        /**
         * Two arguments to the resolve:
         * - data from the server
         * - callback to be able to get the "label".
         */
        resolve({
          data: dataFromServer,
          label: function (item) {
            // using ember data, this might be "item.get('name')"
            return item.name;
          }
        });
      }, waitMS);

    });
  },

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

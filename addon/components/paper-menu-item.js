import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-menu-item',

  actions: {
    action: function  () {
      this.sendAction('action', this.get('param'));
    }
  }

});

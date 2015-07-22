import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-menu',


  visible: false,
  position: 'target',
  offset: '0 0',

  actions: {
    toggleMenu: function () {
      this.toggleProperty('visible');
    }
  },

  positionMode: Ember.computed('position', function() {
    var attachment = (this.get('position') || 'target').split(' ');

    // If attachment is a single item, duplicate it for our second value.
    // ie. 'target' -> 'target target'
    if (attachment.length == 1) {
      attachment.push(attachment[0]);
    }

    return {
      left: attachment[0],
      top: attachment[1]
    };
  }),

  offsets: Ember.computed('offset', function() {
    var offsets = (this.get('offset') || '0 0').split(' ').map(parseFloat);
    if (offsets.length == 2) {
      return {
        left: offsets[0],
        top: offsets[1]
      };
    } else if (offsets.length == 1) {
      return {
        top: offsets[0],
        left: offsets[0]
      };
    } else {
      throw Error('Invalid offsets specified. Please follow format <x, y> or <n>');
    }
  })

});

import Ember from 'ember';
/* globals Hammer */

export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open', 'opaque:ng-enter'],


  // Hammer event handler for tapping backdrop
  tapHammer: null,

  didInsertElement () {
    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this.onTap));
    this.set('tapHammer', hammer);
  },

  willDestroyElement () {
    var copy = this.$().clone();

    Ember.run.later(() => {
      copy.remove();
    }, 0.2 * 1000);
  },

  onTap (e) {
    e.preventDefault();

    this.sendAction('tap');
  }


});

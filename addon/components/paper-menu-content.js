import Ember from 'ember';
import PaperMenuContainer from './paper-menu-container';
import PaperMenuContainerWrap from './paper-menu-container-wrap';

export default Ember.Component.extend({
  tagName: 'md-menu-content',

  constants: Ember.inject.service(),

  classNames: ['md-default-theme'],
  attributeBindings: ['width'],
  width: 4,

  menuContainer: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuContainer);
    return container;
  }),

  menuContainerWrap: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuContainerWrap);
    return container;
  }),


  keyDown (e) {
    if (e.keyCode == this.get('constants').KEYCODE.get('ESCAPE')) {
      console.log("SENT ACTION");
      this.get('menuContainer').send('toggleMenu');
    }
  },


  didInsertElement () {
    var _self = this;
    // kick off initial focus in the menu on the first element

    Ember.run.later(function () {
      var focusTarget = _self.$().find('.md-menu-focus-target');
      if (!focusTarget.length) {
        focusTarget = _self.$().children().eq(0).children().eq(0);
      }
      focusTarget.focus();
    });
  }

});

import Ember from 'ember';
import PaperMenuContainer from './paper-menu-container';



export default Ember.Component.extend({

  menuContainer: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuContainer);
    return container;
  }),

  classNames: ['md-open-menu-container', 'md-whiteframe-z2', 'md-default-theme', 'md-clickable'],
  classNameBindings: ['menuContainer.queueShowTransition:md-active', 'menuContainer.queueDestroyTransition:md-leave'],

  moveComponentToBody: Ember.on('didInsertElement', function () {
    var dom = this.$().detach();
    Ember.$('body').append(dom);
  }),


  didInsertElement () {
    var _self = this;
    var menuContainer = this.get('menuContainer');
    menuContainer.send('animateWrapperIn', this);
  }

});

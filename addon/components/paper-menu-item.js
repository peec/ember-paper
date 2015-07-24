import Ember from 'ember';
import PaperMenuContainer from './paper-menu-container';

export default Ember.Component.extend({
  tagName: 'md-menu-item',

  menuContainer: Ember.computed(function () {
    return this.nearestOfType(PaperMenuContainer);
  }),

  click () {
    this.get('menuContainer').send('toggleMenu');
  }
});

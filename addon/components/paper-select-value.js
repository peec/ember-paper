import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

export default Ember.Component.extend({
  tagName: 'md-select-value',
  classNames: ['md-select-value'],


  menuAbstract: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  click () {
    this.get('menuAbstract').send('toggleMenu');
  }
});

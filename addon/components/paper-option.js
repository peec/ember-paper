import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(RippleMixin, {
  tagName: 'md-option',


  attributeBindings: ['selected'],

  focus: false,

  /* RippleMixin overrides */
  center: false,
  dimBackground: true,
  outline: false,
  isMenuItem: false,
  fullRipple: true,


  menuAbstract: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  click() {
    this.get('menuAbstract').send('selectOption', this.get('value'));
    this.get('menuAbstract').send('toggleMenu');
  },

  selected: Ember.computed('menuAbstract.model', function () {
    return this.get('menuAbstract').get('model') === this.get('value') ? 'selected' : null;
  })

});

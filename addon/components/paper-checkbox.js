import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

var KEY_CODE_SPACE = 32;

export default BaseFocusable.extend(RippleMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  //Alow element to be focusable by supplying a tabindex 0
  attributeBindings: ['tabindex', 'role', 'ariaLabel:aria-label'],
  tabindex: Ember.computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),
  role: 'checkbox',

  checked: false,
  toggle: true,

  /* RippleMixin overrides */
  center: true,
  dimBackground: false,
  rippleContainerSelector: '.md-container',

  click() {
    if (!this.get('disabled')) {
      this.toggleProperty('checked');
    }
  },

  keyPress(ev) {
    if (ev.which === KEY_CODE_SPACE) {
      this.click();
    }
  },

  ariaLabel: Ember.computed('label', function () {
    return this.get("label") || null;
  })

});

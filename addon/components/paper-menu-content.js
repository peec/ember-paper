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


  keyDown (ev) {
    var KeyCodes = this.get('constants').KEYCODE;
    switch(ev.keyCode) {
      case KeyCodes.get('ESCAPE'):
        this.get('menuContainer').send('toggleMenu');
        break;
      case KeyCodes.get('UP_ARROW'):
        this.focusMenuItem(ev, -1);
        break;
      case KeyCodes.get('DOWN_ARROW'):
        this.focusMenuItem(ev, 1);
        break;
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
  },

  focusMenuItem(e, direction) {
    var currentItem = Ember.$(e.target).closest('md-menu-item');

    var children = this.$().children();
    var items = Ember.$.makeArray(children);
    var currentIndex = children.index(currentItem);

    // Traverse through our elements in the specified direction (+/-1) and try to
    // focus them until we find one that accepts focus
    for (var i = currentIndex + direction; i >= 0 && i < items.length; i = i + direction) {
      var focusTarget = items[i].firstElementChild || items[i];
      var didFocus = this.attemptFocus(focusTarget);
      if (didFocus) {
        break;
      }
    }
  },
  attemptFocus(el) {
    if (el && el.getAttribute('tabindex') !== -1) {
      el.focus();
      if (document.activeElement === el) {
        return true;
      } else {
        return false;
      }
    }
  },

  checkClickTarget(e) {
    var target = e.target;

    // Traverse up the event until we get to the menuContainer to see
    // if there is a click and that the element is not disabled
    do {
      if (target === this.menuContents) {
        return;
      }

      if (target.hasAttribute('action')) {
        if (!target.hasAttribute('disabled')) {
          this.get('menuContainer').send('toggleMenu');
        }
        break;
      }
    } while (target = target.parentNode);

  },

  click (e) {
    this.checkClickTarget(e);
  }

});

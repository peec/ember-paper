import Ember from 'ember';
/* globals Hammer */

function setStyleDiff (el, diff, remove) {
  for (var name in diff) {
    if (diff.hasOwnProperty(name)) {
      if (remove) {
        el.style[name] = 'inherit';
      } else {
        el.style[name] = diff[name];
      }
    }
  }
}

function objectDiff(before, after) {
  var diffs = {};
  for (var name in after) {
    if (name === 'cssText' || name === 'visibility') {
      continue;
    }
    var a = after[name];
    var b = before[name];
    if (after.hasOwnProperty(name)) {
      if (b !== a) {
        diffs[name] = a;
      }
    }
  }
  return diffs;
}



export default Ember.Component.extend({
  tagName: 'md-backdrop',
  classNames: ['md-default-theme'],
  classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open', 'animated:ng-enter'],


  // Hammer event handler for tapping backdrop
  tapHammer: null,


  didInsertElement () {

    var hammer = new Hammer(this.get('element'));
    hammer.on('tap', Ember.run.bind(this, this.onTap));
    this.set('tapHammer', hammer);
    this.runAnimation();
  },

  constants: Ember.inject.service(),

  animationClass: 'md-opaque',

  runAnimation: function (destroy) {
    var _self = this;

    if (this.get('animated')) {
      if (destroy) {
        if (this.get('__enterStylesReverese')) {
          var el = this.$().clone().addClass(this.get('animationClass')).addClass('ng-leave').removeClass('ng-enter').appendTo('body');
          setStyleDiff(el[0], _self.get('__enterStylesReverese'));
          Ember.run.later(function () {
            el.remove();
          }, 400);
        }
      } else {
        var animationRules = new Ember.RSVP.Promise(function (resolve) {
          if (_self.get('__enterStyles')) {
            resolve();
            return;
          }
          var el = _self.$();
          var before = window.getComputedStyle(el[0], null);
          window.requestAnimationFrame(function () {
            var clone = el.clone()
              .css('visibility', 'hidden')
              .addClass(_self.get('animationClass'))
              .addClass('ng-enter-active')
              .insertAfter(_self.$());

            window.requestAnimationFrame(function () {
              var after = window.getComputedStyle(clone[0], null);
              var diff = objectDiff(before, after);
              var diffReverse = objectDiff(after, before);
              _self.set('__enterStyles', diff);
              _self.set('__enterStylesReverese', diffReverse);
              clone.remove();
              resolve();
            });
          });
        });

        animationRules.then(function () {
          setStyleDiff(_self.get('element'), _self.get('__enterStyles'));
        });
      }

    }
  },

  willDestroyElement () {
    this.runAnimation(true);
  },

  onTap (e) {
    e.preventDefault();

    this.sendAction('tap');
  }


});

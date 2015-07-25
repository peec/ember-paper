import Ember from 'ember';
import PaperMenuContainer from './paper-menu-container';
import PaperMenuAbstract from './paper-menu-abstract';



export default Ember.Component.extend({


  animate: Ember.inject.service(),
  constants: Ember.inject.service(),

  classNames: ['md-whiteframe-z2', 'md-default-theme', 'md-open-menu-container'],
  classNameBindings: ['interaction:md-clickable'],


  menuContainer: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuContainer);
    return container;
  }),

  abstractComponent: Ember.computed(function () {
    var container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),


  interaction: Ember.computed('abstractComponent', function () {
    return this.get('abstractComponent').get('interaction');
  }),

  moveComponentToBody: Ember.on('didInsertElement', function () {
    var _self = this;
    var dom = this.$().detach();
    this.$().addClass(this.get('abstractComponent').get('wrapperClass'));
    Ember.$('body').append(dom);


    var menuContainer = this.get('menuContainer');

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        menuContainer.registerWrapper(_self);
        window.requestAnimationFrame(function () {
          _self.$().addClass('md-active');
          _self.set('alreadyOpen', true);
          _self.$()[0].style[_self.get('constants').get('CSS').TRANSFORM] = '';
        });
      });
    });

    _self.get('animate')
      .waitTransitionEnd(_self.$(), {timeout: 370})
      .then(function (response) {

      });
  }),


  hideWrapper () {
    var _self = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      var menuContainer = _self.get('menuContainer');
      _self.get('animate').waitTransitionEnd(_self.$(), { timeout: 370 }).then(resolve);
      _self.$().removeClass('md-active').addClass('md-leave');
    });
  },
  actions: {
    toggleMenu: function () {
      this.get('menuContainer').send('toggleMenu');
    }
  }
});

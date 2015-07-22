import Ember from 'ember';

var MENU_EDGE_MARGIN = 8;


export default Ember.Component.extend({

  animate: Ember.inject.service(),
  constants: Ember.inject.service(),

  tagName: 'div',
  classNames: ['md-open-menu-container', 'md-whiteframe-z2', 'md-default-theme', 'md-clickable'],
  classNameBindings: ['active:md-active'],

  queueDestroy: false,


  _init: Ember.on('init', function () {
    this.get('menu').set('content',this);
  }),

  moveComponentToBody: Ember.on('didInsertElement', function () {
    var dom = this.$().detach();
    Ember.$('body').append(dom);
  }),

  alreadyOpen: false,
  menuContentEl: Ember.computed('menu', function ()  {  
    return this.$().find('md-menu-content');
  }),

  didInsertElement () {
    var _self = this;

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        _self.positionMenu(_self.$());
        window.requestAnimationFrame(function () {
          _self.set('active', true);
          _self.get('element').style[_self.get('constants').get('CSS').TRANSFORM] = '';

          _self.get('animate')
            .waitTransitionEnd(_self.$(), {timeout: 370})
            .then( function(response) {
              return response;
            });
        });
      });
    });
  },

  click ()  {
    this.set('queueDestroy', true);
  },

  destroyObserver: Ember.observer('queueDestroy', function () {
    var _self = this;
    if (this.get('queueDestroy')) {

      this.get('animate').waitTransitionEnd(this.$(), { timeout: 370 }).then(function () {
        _self.get('menu').set('visible', false);
      });
    }
  }),


  positionMenu(el) {
    var opts = {
      target: this.get('menu').$().children().first().find('md-icon')
    };


    var containerNode = el[0],
      openMenuNode = el[0].firstElementChild,
      openMenuNodeRect = openMenuNode.getBoundingClientRect(),
      boundryNode = this.get('menu').$()[0],
      boundryNodeRect = boundryNode.getBoundingClientRect();

    var originNode = opts.target[0].querySelector('[md-menu-origin]') || opts.target[0],
      originNodeRect = originNode.getBoundingClientRect();



    var bounds = {
      left: boundryNodeRect.left + MENU_EDGE_MARGIN,
      top: Math.max(boundryNodeRect.top, 0) + MENU_EDGE_MARGIN,
      bottom: Math.max(boundryNodeRect.bottom, Math.max(boundryNodeRect.top, 0) + boundryNodeRect.height) - MENU_EDGE_MARGIN,
      right: boundryNodeRect.right - MENU_EDGE_MARGIN
    };


    var alignTarget, alignTargetRect, existingOffsets;
    var positionMode = this.get('menu').get('positionMode');

    if (positionMode.top == 'target' || positionMode.left == 'target' || positionMode.left == 'target-right') {
      // TODO: Allow centering on an arbitrary node, for now center on first menu-item's child
      alignTarget = firstVisibleChild();
      if (!alignTarget) {
        throw Error('Error positioning menu. No visible children.');
      }

      alignTarget = alignTarget.firstElementChild || alignTarget;
      alignTarget = alignTarget.querySelector('[md-menu-align-target]') || alignTarget;
      alignTargetRect = alignTarget.getBoundingClientRect();

      existingOffsets = {
        top: parseFloat(containerNode.style.top || 0),
        left: parseFloat(containerNode.style.left || 0)
      };
    }

    var position = {};
    var transformOrigin = 'top ';

    switch (positionMode.top) {
      case 'target':
        position.top = existingOffsets.top + originNodeRect.top - alignTargetRect.top;
        break;
      // Future support for mdMenuBar
      // case 'top':
      //   position.top = originNodeRect.top;
      //   break;
      // case 'bottom':
      //   position.top = originNodeRect.top + originNodeRect.height;
      //   break;
      default:
        throw new Error('Invalid target mode "' + positionMode.top + '" specified for md-menu on Y axis.');
    }

    switch (positionMode.left) {
      case 'target':
        position.left = existingOffsets.left + originNodeRect.left - alignTargetRect.left;
        transformOrigin += 'left';
        break;
      case 'target-right':
        position.left = originNodeRect.right - openMenuNodeRect.width + (openMenuNodeRect.right - alignTargetRect.right);
        transformOrigin += 'right';
        break;
      // Future support for mdMenuBar
      // case 'left':
      //   position.left = originNodeRect.left;
      //   transformOrigin += 'left';
      //   break;
      // case 'right':
      //   position.left = originNodeRect.right - containerNode.offsetWidth;
      //   transformOrigin += 'right';
      //   break;
      default:
        throw new Error('Invalid target mode "' + positionMode.left + '" specified for md-menu on X axis.');
    }

    var offsets = this.get('menu').get('offsets');
    position.top += offsets.top;
    position.left += offsets.left;

    clamp(position);

    el.css({
      top: position.top + 'px',
      left: position.left + 'px'
    });

    containerNode.style[this.get('constants').get('CSS').TRANSFORM_ORIGIN] = transformOrigin;

    // Animate a scale out if we aren't just repositioning
    containerNode.style[this.get('constants').get('CSS').TRANSFORM] = 'scale(' +
      Math.min(originNodeRect.width / containerNode.offsetWidth, 1.0) + ',' +
      Math.min(originNodeRect.height / containerNode.offsetHeight, 1.0) +
      ')';

    /**
     * Clamps the repositioning of the menu within the confines of
     * bounding element (often the screen/body)
     */
    function clamp(pos) {
      pos.top = Math.max(Math.min(pos.top, bounds.bottom - containerNode.offsetHeight), bounds.top);
      pos.left = Math.max(Math.min(pos.left, bounds.right - containerNode.offsetWidth), bounds.left);
    }

    /**
     * Gets the first visible child in the openMenuNode
     * Necessary incase menu nodes are being dynamically hidden
     */
    function firstVisibleChild() {
      for (var i = 0; i < openMenuNode.children.length; ++i) {
        if (window.getComputedStyle(openMenuNode.children[i]).display != 'none') {
          return openMenuNode.children[i];
        }
      }
    }
  }

});

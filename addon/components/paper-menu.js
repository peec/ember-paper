import Ember from 'ember';
import PaperMenuContainer from './paper-menu-container';


export default Ember.Component.extend({
  tagName: 'md-menu',

  e: Ember.on('init', function () {
    this.get('menuContainer').set('pane', this);
  })


});

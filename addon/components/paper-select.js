import PaperMenuAbstract from './paper-menu-abstract';

export default PaperMenuAbstract.extend({
  tagName: 'md-select',
  interaction: true,
  wrapperClass: 'md-select-menu-container',


  placeholder: null,


  label: Ember.computed('model', function () {
    return this.get('model') ? this.get('model') : this.get('placeholder');
  }),

  actions: {
    selectOption (model) {
      this.set('model', model);
    }
  }
});

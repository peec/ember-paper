import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('paper-menu-item', 'Integration | Component | paper menu item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-menu-item}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-menu-item}}
      template block text
    {{/paper-menu-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

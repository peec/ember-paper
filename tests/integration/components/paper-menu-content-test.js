import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('paper-menu-content', 'Integration | Component | paper menu content', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-menu-content}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-menu-content}}
      template block text
    {{/paper-menu-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

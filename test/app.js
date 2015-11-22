
import { assert } from 'chai';

import ModRewrite from '../src/swproxy-mod-rewrite.js';


describe('swproxy:mod-rewrite', function () {
  before(function (done) {
    done();
  });

  it('provides a name for the factory method', function () {
    assert.equal(ModRewrite.factoryMethodName(), 'rewriteRule', 'Name for the mod rule is defined');
  });

  it('provides a factory method to create a RewriteRule', function () {
    let factoryMethod = ModRewrite.factoryMethod({mockProxyProperty: 'mock property in a mock class'});

    assert.typeOf(factoryMethod, 'function', 'factory method that expect a proxy as argument is defined');
    assert.ok(factoryMethod('arg1', 'foo', 'bar'));

  });
});

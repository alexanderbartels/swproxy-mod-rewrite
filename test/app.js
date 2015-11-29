
import { assert } from 'chai';

import { default as ModRewrite, ModRewriteRule } from '../src/swproxy-mod-rewrite.js';

describe('swproxy:mod-rewrite', function () {
  before(function (done) {
    done();
  });

  it('provides a name for the factory method', function () {
    assert.equal(ModRewrite.factoryMethodName(), 'rewriteRule', 'Name for the mod rule is defined');
  });

  it('provides a factory method to create a RewriteRule', function (done) {
    let proxyMod = {
      addFetchRule: (rule) => {
        assert.ok(rule, 'rule is defined');
        done();
      }
    };

    let factoryMethod = ModRewrite.factoryMethod(proxyMod);
    assert.typeOf(factoryMethod, 'function', 'factory method that expect a proxy as argument is defined');
    assert.typeOf(factoryMethod('arg1', 'foo', 'bar'), 'object', 'rule factory creates an object');
  });
});


describe('swproxy:mod-rewrite-rule', function () {
  it('should be defined', function () {
    assert.typeOf(new ModRewriteRule(), 'object', 'ModRewriteRule is defined');
  });
});

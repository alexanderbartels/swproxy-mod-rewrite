

/*eslint-disable no-alert, no-console */
class ModRewriteRule {
  constructor(proxy, args) {
    console.log('Rewrite rule created: ', proxy, args);
  }
}
/*eslint-enable no-alert, no-console */

/**
 * The Proxy for service workers
 */
class ModRewrite {

  /**
   *
   * @returns {string} name for the factory method
   */
  static factoryMethodName() {
    return 'rewriteRule';
  }

  /**
   *
   * @param proxy the swproxy instances
   * @returns {Function} function that returns a factory function to create rules
   */
  static factoryMethod(proxy) {
    return function (...args) {
      return new ModRewriteRule(proxy, args);
    };
  }
}

export default ModRewrite;

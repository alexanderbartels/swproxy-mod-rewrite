
/*eslint-disable no-alert, no-console */
class ModRewriteRule {
  constructor(srcUrl, destUrl, modifier) {
    console.log('Rewrite rule created: ', srcUrl, destUrl, modifier);

    this.srcUrl = srcUrl;
    this.destUrl = destUrl;
    this.modifier = modifier;
  }

  match(event) {
    return this.srcUrl.test(event.request.url);
  }

  execute(originalEvent, event) {
    console.log('execute rule for request: ', this.destUrl, originalEvent, event);

    return new Promise((resolve) => {
      let matches = this.srcUrl.exec(event.request.url);
      let calculatedUrl = this.destUrl;

      matches.forEach((match, i) => {
        calculatedUrl = calculatedUrl.replace('$' + i, match);
      });

      event.request.url = calculatedUrl;
      resolve(this.mergeModifier(event, this.modifier));
    });
  }

  /**
   * merges the current available modifiers into the event object
   * @param event
   * @param modifier
   * @returns {*}
     */
  mergeModifier(event, modifier) {
    event.stopPropagation = modifier.stopPropagation;
    return event;
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
  static factoryMethod(swproxy) {
    return (srcUrl, destUrl, modifier) => {
      let rule = new ModRewriteRule(srcUrl, destUrl, modifier);
      swproxy.addFetchRule(rule);
      return rule;
    };
  }
}

export default ModRewrite;

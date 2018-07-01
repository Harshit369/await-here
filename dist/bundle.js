(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['await-for'] = {})));
}(this, (function (exports) { 'use strict';

  /**
   * Resolves/rejects the promise in one single line
   * @param { promise } promise
   * @returns { promise } promise that results with [ error, data ]
   */
  const awaitFor = promise => {
    return promise.then(data => [null, data]).catch(err => [err, null]);
  };

  exports.awaitFor = awaitFor;
  exports.default = awaitFor;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

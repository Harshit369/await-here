(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['await-for'] = {})));
}(this, (function (exports) { 'use strict';

  /**
   * Resolves/rejects the promise in one single line
   * @param { promise } promise
   * @returns { promise } promise that resolves with [ error, data ]
   */
  const here = promise => {
    return promise.then(data => [null, data]).catch(err => [err]);
  };

  exports.here = here;
  exports.default = here;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

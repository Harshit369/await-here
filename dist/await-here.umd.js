(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['await-here'] = {})));
}(this, (function (exports) { 'use strict';

  function here(promise) {
      return promise
          .then((data) => [null, data])
          .catch((err) => [err, undefined]);
  }
  function chain(promise, ...transformations) {
      const promiseChain = transformations.reduce((chain, transformer) => {
          return chain.then(data => Promise.resolve(transformer(data)));
      }, promise);
      return here(promiseChain);
  }

  exports.here = here;
  exports.chain = chain;
  exports.default = here;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

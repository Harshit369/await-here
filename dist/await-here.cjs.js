'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const here = (promise) => promise
    .then(data => [null, data])
    .catch(err => [err, undefined]);

exports.here = here;
exports.default = here;

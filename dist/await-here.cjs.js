'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

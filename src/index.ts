/**
 * Resolves/rejects the promise in one single line
 * @param { Promise } Promise
 * @returns { Promise } Promise that resolves with [ error, data ]
 */
export const here = <T, E = any>(promise: Promise<T>) =>
  promise
    .then<[null, T]>(data => [null, data])
    .catch<[E, undefined]>(err => [err, undefined]);

/**
 * @param {Promise} promise Actual promise to transform
 * @param  {Functions} transformations List of transform function to pipe promise result through.
 * @returns { Promise } here-fied Promise that resolves with [ error, resultAfterTransformations ]
 */
export const chain = <T, E = any>(promise: Promise<T>, ...transformations) => {
  const promiseChain = transformations.reduce((chain, transformer) => {
    return chain.then(data => Promise.resolve(transformer(data)));
  }, promise);
  return here<T, E>(promiseChain);
};

export default here;

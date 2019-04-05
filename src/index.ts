/**
 * Resolves/rejects the promise in one single line
 * @param { Promise } Promise
 * @returns { Promise } Promise that resolves with [ error, data ]
 */
export function here<T, E = any>(
  promise: Promise<T>
): Promise<[E, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[E, undefined]>((err: E) => [err, undefined]);
}

/**
 * @param {Promise} promise Actual promise to transform
 * @param  {Functions} transformations List of transform function to pipe promise result through.
 * @returns { Promise } here-fied Promise that resolves with [ error, resultAfterTransformations ]
 */
export function chain<T, R = T, E = any>(
  promise: Promise<T>,
  ...transformations: Array<(any: any) => any>
): Promise<[E, undefined] | [null, R]> {
  const promiseChain = transformations.reduce(
    (chain: Promise<any>, transformer) => {
      return chain.then<ReturnType<typeof transformer>>(data =>
        transformer(data)
      );
    },
    promise
  );
  return here<R, E>(promiseChain);
}

export default here;

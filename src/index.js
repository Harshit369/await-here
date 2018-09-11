/**
 * Resolves/rejects the promise in one single line
 * @param { promise } promise
 * @returns { promise } promise that resolves with [ error, data ]
 */
export const here = promise => {
  return promise.then(data => [null, data]).catch(err => [err]);
};

export default here;

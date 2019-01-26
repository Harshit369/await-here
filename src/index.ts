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

export default here;

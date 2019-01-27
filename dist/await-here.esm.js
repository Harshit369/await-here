const here = (promise) => promise
    .then(data => [null, data])
    .catch(err => [err, undefined]);

export default here;
export { here };

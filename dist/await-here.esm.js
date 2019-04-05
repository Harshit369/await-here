function here(promise) {
    return promise
        .then((data) => [null, data])
        .catch((err) => [err, undefined]);
}
function chain(promise, ...transformations) {
    const promiseChain = transformations.reduce((chain, transformer) => {
        return chain.then(data => transformer(data));
    }, promise);
    return here(promiseChain);
}

export default here;
export { here, chain };

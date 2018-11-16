const { expect, assert } = require('chai');
const { chain } = require('../src/index');

describe('#chain', () => {
  it('should return a promise', () => {
    const defaultPromise = chain(Promise.resolve('foo'));
    expect(defaultPromise).to.be.an.instanceOf(Promise);
  })

  it('should return an array when await-ed', async () => {
    const promiseToResolve = Promise.resolve('foo');
    const promiseToReject = Promise.reject('foo');

    const resolvedValues = await chain(promiseToResolve);
    assert(Array.isArray(resolvedValues));

    const rejectedValues = await chain(promiseToReject)
    assert(Array.isArray(rejectedValues));
  });

  it('should transform properly', async () => {
    const testValue = 'foo';
    const finalValue = 'oo';
    const noobPromise = Promise.resolve(testValue);
    const [, data] = await chain(noobPromise, (string) => string.slice(1, 3));
    expect(data).to.equal(finalValue);
  });

  it('should be catched properly', async () => {
    const error = 'foo';
    const noobPromise = Promise.reject(error);
    const [err, data] = await chain(noobPromise);
    expect(err).to.equal(error);
    expect(data).to.be.undefined;
  });
});

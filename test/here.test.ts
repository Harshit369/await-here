import { expect, assert } from 'chai';
import { here, default as hereAsDefault } from '../src/index';

describe('#here', () => {
  it('should return a promise', () => {
    const defaultPromise = here(Promise.resolve('foo'));
    expect(defaultPromise).to.be.an.instanceOf(Promise);
  });

  it('should return an array when await-ed', async () => {
    const promiseToResolve = Promise.resolve('foo');
    const promiseToReject = Promise.reject('foo');

    const resolvedValues = await here(promiseToResolve);
    assert(Array.isArray(resolvedValues));

    const rejectedValues = await here<undefined, string>(promiseToReject);
    assert(Array.isArray(rejectedValues));
  });

  it('should return a value when resolved', async () => {
    const testValue = 'foo';
    const noobPromise = Promise.resolve(testValue);
    const [, data] = await here(noobPromise);
    expect(data).to.equal(testValue);
  });

  it('should return an error when rejected', async () => {
    const error = 'foo';
    const noobPromise = Promise.reject(error);
    const [err, data] = await here(noobPromise);
    expect(err).to.equal(error);
    expect(data).to.be.undefined;
  });

  it('default and named export should be same', () => {
    expect(here).to.equal(hereAsDefault);
  });
});

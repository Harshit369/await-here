const { expect, assert } = require('chai');
const { job } = require('../src/index');

describe('#job', () => {
  it('should return a promise', () => {
    const defaultPromise = job(() => 'foo');
    expect(defaultPromise).to.be.an.instanceOf(Promise);
  })

  it('should return an array when await-ed', async () => {
    const jobToOffload = () => true;

    const resolvedValues = await job(jobToOffload);
    assert(Array.isArray(resolvedValues));
  });

  it('should accept catch definition', async () => {
    const jobThatWillPass = () => true;
    const jobThatWillFail = () => false;
    const isCatch = (result) => !result;

    const resolvedValues = await job(jobThatWillPass, isCatch);
    assert(resolvedValues[1]);

    const rejectedValues = await job(jobThatWillFail, isCatch)
    assert(!rejectedValues[0]);
  });

  it('must resolve correctly', async () => {
    const testValue = 'foo';
    const jobToOffload = () => testValue;
    const [, data] = await job(jobToOffload);
    expect(data).to.equal(testValue);
  });
});

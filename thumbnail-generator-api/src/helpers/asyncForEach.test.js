const asyncForEach = require('./asyncForEach');

describe('asyncForEach', () => {
  it('should iterate a collection and execute a callback', async () => {
    const mockCallback = jest.fn(x => x * 2);
    await asyncForEach([5, 7, 9], mockCallback);

    const { calls } = mockCallback.mock;

    expect(calls.length).toBe(3);

    // The first argument of the first call to the function was ...
    expect(calls[0][0]).toBe(5);

    // The first argument of the last call to the function was ...
    expect(calls[2][0]).toBe(9);

    expect(mockCallback.mock.results[0].value).toBe(10);
  });

  it('should be async', () => {
    const mockCallback = jest.fn(x => x * 2);
    asyncForEach([5, 7, 9], mockCallback);

    const { calls } = mockCallback.mock;

    // will be called once because we are not awaiting
    expect(calls.length).toBe(1);
  });
});

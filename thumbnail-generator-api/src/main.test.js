const execute = require('./main');
const { measureTime } = require('./helpers/measurement');

describe('main', () => {
  it('should execute in less than 500ms', async () => {
    const inputFile = `${__dirname}/__tests__/alice.jpg`;
    const { timeConsumed } = await measureTime(execute, [inputFile], { output: false });

    expect(timeConsumed).toBeLessThan(500);
  });
});

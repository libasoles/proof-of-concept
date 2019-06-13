const generateFilename = require('./generateFilename');

describe('generateFilename', () => {
  it('should return a filename with a valid extension', () => {
    const file = '../alice.jpg';
    const filename = generateFilename(file, 'test');

    expect(filename).toBe('test.jpg');
  });
});

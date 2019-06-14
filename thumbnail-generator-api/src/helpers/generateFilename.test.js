const generateFilename = require('./generateFilename');

describe('generateFilename', () => {
  it('should return a filename with a valid extension', () => {
    let file;
    let filename;

    // first image
    file = '/__tests__/alice.jpg';
    filename = generateFilename(file, { prefix: 'test' });

    expect(filename.substring(0, 4)).toBe('test');
    expect(filename.includes('.jpg')).toBe(true);

    // second image
    file = '/__tests__/cheshire-cat.gif';
    filename = generateFilename(file, { prefix: 'test' });

    expect(filename.includes('.gif')).toBe(true);
  });
});

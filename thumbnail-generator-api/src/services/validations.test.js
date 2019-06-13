const fs = require('fs');
const sharp = require('sharp');

const createImageValidator = require('./validations');

describe('validateImage', () => {
  let validateImage;

  const validImage = `${__dirname}/__tests__/alice.jpg`;
  const bigImage = `${__dirname}/__tests__/tmpTest.jpg`;

  const config = {
    mimeTypes: ['image/jpeg', 'image/png'],
    maxSize: 5 * 1024 * 1024,
  };

  beforeEach(() => {
    validateImage = createImageValidator(config);
  });

  it('should be valid', () => {
    expect(() => validateImage(validImage)).not.toThrow();
  });

  it('should fail with a wrong mimetype', () => {
    const inputFile = `${__dirname}/__tests__/cheshire-cat.gif`;
    expect(() => validateImage(inputFile)).toThrow();
  });

  it('should fail with a large image', async () => {
    const image = sharp(validImage).resize(9000, 9000);
    const imageBuffer = await image.toBuffer();

    expect(imageBuffer.byteLength).not.toBeLessThan(config.maxSize);

    // save it temporarily to validate it
    await image.toFile(bigImage);
    expect(() => validateImage(image)).toThrow();
  });

  afterAll(() => {
    fs.unlink(`${__dirname}/${bigImage}`, () => {});
  });
});

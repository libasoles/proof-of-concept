const fs = require('fs');
const sharp = require('sharp');

const createImageValidator = require('./validations');

describe('validateImage', () => {
  let validateImage;

  const validImage = `${__dirname}/alice.jpg`;
  const bigImage = `${__dirname}/tmpTest.jpg`;

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
    const inputFile = 'cheshire-cat.gif';
    expect(() => validateImage(inputFile)).toThrow();
  });

  it('should fail with a large image', async () => {
    const image = await sharp(validImage).resize(9000, 9000);
    const imageBuffer = await image.toBuffer();

    expect(imageBuffer.byteLength).not.toBeLessThan(config.maxSize);

    // save it temporarily to validate it
    image.toFile(image);
    expect(() => validateImage(image)).toThrow();
  });

  afterAll(() => {
    fs.unlink(`${__dirname}/${bigImage}`, () => {});
  });
});

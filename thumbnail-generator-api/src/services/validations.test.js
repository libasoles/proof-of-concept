const fs = require('fs');
const sharp = require('sharp');

const createImageValidator = require('./validations');
const ValidationError = require('./ValidationError');

describe('validateImage', () => {
  let validateImage;

  const validImage = `${__dirname}/../__tests__/alice.jpg`;
  const bigImage = `${__dirname}/../__tests__/tmp-test.jpg`;

  const criteria = {
    mimeTypes: ['image/jpeg', 'image/png'],
    maxSize: 5 * 1024 * 1024,
  };

  beforeEach(() => {
    validateImage = createImageValidator(criteria);
  });

  it('should be valid', () => {
    expect(() => validateImage(validImage)).not.toThrow();
  });

  it('should fail with a wrong mimetype', () => {
    const inputFile = '/__tests__/cheshire-cat.gif';
    expect(() => validateImage(inputFile)).toThrowError(ValidationError);;
  });

  it('should fail with a large image', async () => {
    const validateMaxSize = createImageValidator({
      maxSize: 5 * 1024 * 1024,
    });
    const image = sharp(validImage).resize(9000, 9000);
    const imageBuffer = await image.toBuffer();

    expect(imageBuffer.byteLength).not.toBeLessThan(criteria.maxSize);

    // save it temporarily to validate it
    await image.toFile(bigImage);

    expect(() => validateMaxSize(bigImage)).toThrowError(ValidationError);
  });

  afterAll(() => {
    fs.unlink(bigImage, () => {});
  });
});

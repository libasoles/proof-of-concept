const sizeOf = require('buffer-image-size');

const { resize } = require('./functions');

describe('resize', () => {
  const config = {
    width: 120,
    height: 120,
  };

  it('should resize an image to given dimensions', async () => {
    const validImage = `${__dirname}/alice.jpg`;
    const output = resize(validImage, config);
    const image = await output.toBuffer();

    expect(sizeOf(image)).toMatchObject(config);
  });
});

const sizeOf = require('buffer-image-size');

const { rescale, createImageCrops } = require('./resizer');
const MockStorage = require('./storage/MockStorage');

describe('rescale', () => {
  const dimensions = {
    width: 120,
    height: 120,
  };

  it('should resize an image to given dimensions', async () => {
    const validImage = `${__dirname}/__tests__/alice.jpg`;
    const output = rescale(validImage, dimensions);
    const outputBuffer = await output.toBuffer();

    expect(sizeOf(outputBuffer)).toMatchObject(dimensions);
  });
});

describe('createImageCrops', () => {
  it('should create n resized images and provide the correct links', async () => {
    const image = `${__dirname}/__tests__/alice.jpg`;
    const basePath = 'https://cloud.store/';
    const storage = new MockStorage({ basePath });
    const resizeStrategy = jest.fn(() => {});
    const filenamePrefix = 'test';
    const dimensions = [
      {
        width: 120,
        height: 120,
      },
      {
        width: 240,
        height: 240,
      },
    ];

    const result = await createImageCrops({
      image,
      dimensions,
      storage,
      resize: resizeStrategy,
      filenamePrefix,
    });

    expect(resizeStrategy.mock.calls.length).toBe(2);
    expect(result.length).toBe(2);

    let width;
    let height;
    ({ width, height } = dimensions[0]);
    expect(result[0]).toBe(`${`${basePath + filenamePrefix}-${width}`}x${height}.jpg`);

    ({ width, height } = dimensions[1]);
    expect(result[1]).toBe(`${`${basePath + filenamePrefix}-${width}`}x${height}.jpg`);
  });
});

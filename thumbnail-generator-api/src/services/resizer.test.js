const fs = require('fs');
const sizeOf = require('buffer-image-size');

const { rescale, createImageCrops } = require('./resizer');
const MockStorage = require('./storage/__mocks__/MockStorage');

describe('rescale', () => {
  const dimensions = {
    width: 120,
    height: 120,
  };

  it('should resize an image to given dimensions', async () => {
    const validImage = `${__dirname}/../__tests__/alice.jpg`;
    const outputBuffer = await rescale(validImage, dimensions);

    expect(sizeOf(outputBuffer)).toMatchObject(dimensions);
  });

  it('should resize a file image to given dimensions', async () => {
    const validImage = `${__dirname}/../__tests__/alice.jpg`;
    const outputBuffer = await rescale(validImage, dimensions);

    expect(sizeOf(outputBuffer)).toMatchObject(dimensions);
  });

  it('should resize a buffered image to given dimensions', async () => {
    const validImage = fs.readFileSync(`${__dirname}/../__tests__/alice.jpg`);
    const outputBuffer = await rescale(validImage, dimensions);

    expect(sizeOf(outputBuffer)).toMatchObject(dimensions);
  });
});

describe('createImageCrops', () => {
  it('should create n resized images and provide the correct links', async () => {
    const image = fs.readFileSync(`${__dirname}/../__tests__/alice.jpg`);
    const basePath = 'https://cloud.store/';
    const storage = new MockStorage({ basePath });
    const resizeStrategy = jest.fn().mockResolvedValue(Buffer.from('test'));
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
    expect(result[0].includes(`${filenamePrefix}`)).toBe(true);
    expect(result[0].includes(`${width}x${height}`)).toBe(true);

    ({ width, height } = dimensions[1]);
    expect(result[1].includes(`${filenamePrefix}`)).toBe(true);
    expect(result[1].includes(`${width}x${height}`)).toBe(true);
  });
});

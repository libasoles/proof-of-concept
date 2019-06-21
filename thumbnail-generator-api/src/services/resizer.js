const sharp = require('sharp');
const async = require('async');

const generateFilename = require('../helpers/generateFilename');

function rescale(image, dimensions) {
  return sharp(image).resize(dimensions).toBuffer();
}

async function createImageCrops({
  image,
  dimensions,
  storage,
  resize = rescale,
  filenamePrefix = 'crop',
}) {
  const promises = [];

  await async.forEachOf(dimensions, async (dimension) => {
    const { width, height } = dimension;
    const subfolder = `${width}x${height}`;
    const filename = generateFilename(image, {
      prefix: filenamePrefix,
    });

    const croppedImage = await resize(image, dimension);
    const imagePathPromise = storage.store(croppedImage, `${subfolder}/${filename}`);

    promises.push(imagePathPromise);
  });

  const paths = await Promise.all(promises);

  return paths;
}

module.exports = {
  rescale,
  createImageCrops,
};

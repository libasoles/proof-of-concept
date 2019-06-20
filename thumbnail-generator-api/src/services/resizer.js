const sharp = require('sharp');
const async = require('async');

const generateFilename = require('../helpers/generateFilename');

function rescale(image, dimensions) {
  return sharp(image).resize(dimensions);
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
    const filename = await generateFilename(image, {
      prefix: filenamePrefix,
      sufix: `${width}x${height}`,
    });

    resize(image, dimension);
    const imagePathPromise = storage.store(image, filename);

    promises.push(imagePathPromise);
  });

  const paths = await Promise.all(promises);

  return paths;
}

module.exports = {
  rescale,
  createImageCrops,
};

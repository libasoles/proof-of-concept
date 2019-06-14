const sharp = require('sharp');
const async = require('async');

const generateFilename = require('../helpers/generateFilename');

async function rescale(image, dimensions) {
  return sharp(image).resize(dimensions);
}

async function createImageCrops({
  image,
  dimensions,
  storage,
  resize = rescale,
  filenamePrefix = 'crop',
}) {
  const paths = [];

  await async.forEachOf(dimensions, async (dimension) => {
    const { width, height } = dimension;
    const filename = await generateFilename(image, {
      prefix: filenamePrefix,
      sufix: `${width}x${height}`,
    });

    await resize(image, dimension);
    const imagePath = await storage.store(image, filename);

    paths.push(imagePath);
  });


  return paths;
}

module.exports = {
  rescale,
  createImageCrops,
};

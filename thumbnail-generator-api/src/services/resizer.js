const sharp = require('sharp');

const asyncForEach = require('../helpers/asyncForEach');
const generateFilename = require('../helpers/generateFilename');

function rescale(image, dimensions) {
  return sharp(image).resize(dimensions);
}

async function createImageCrops({
  image,
  dimensions,
  storage,
  resize = rescale,
  filenamePrefix = 'output',
}) {
  const paths = [];

  await asyncForEach(dimensions, async (dimension) => {
    const { width, height } = dimension;
    const filename = generateFilename(image, `${filenamePrefix}-${width}x${height}`);

    resize(image, dimension);
    const imagePath = await storage.store(image, filename);

    paths.push(imagePath);
  });

  return paths;
}

module.exports = {
  rescale,
  createImageCrops,
};

const sharp = require("sharp");
const path = require("path");

const asyncForEach = require("./helpers/asyncForEach");

function resize(image, dimensions) {

  return sharp(image).resize(dimensions);
}

function generateFilename(inputFile, outputName) {
  const ext = path.extname(inputFile);

  return `${outputName}${ext}`;
}

async function createImageCrops(image, dimensions, storage) {
  let paths = [];

  await asyncForEach(dimensions, async (dimension) => {
    const {width, height}  = dimension;
    const filename = generateFilename(image, `output-${width}x${height}`);

    resize(image, dimension);
    const path = await storage.store(image, filename);

    paths.push(path);
  });

  return paths;
}

module.exports = {
  resize,
  generateFilename,
  createImageCrops
};
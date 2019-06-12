const sharp = require("sharp");
const path = require("path");

function resize(image, dimensions) {

  return sharp(image).resize(dimensions);
}

function generateFilename(inputFile, outputName) {
  const ext = path.extname(inputFile);

  return `${outputName}.${ext}`;
}

module.exports = {
  resize,
  generateFilename
};
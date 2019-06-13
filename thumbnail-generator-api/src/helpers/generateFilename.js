const path = require('path');

function generateFilename(inputFile, outputName) {
  const ext = path.extname(inputFile);

  return `${outputName}${ext}`;
}

module.exports = generateFilename;

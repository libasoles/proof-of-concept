const uuidv4 = require('uuid/v4');
const { getExtension } = require('../helpers/fileInfo');

function generateFilename(inputFile, { prefix = 'crop' }) {
  const uuid = uuidv4(prefix);
  const ext = getExtension(inputFile);

  return `${prefix}-${uuid}.${ext}`;
}

module.exports = generateFilename;

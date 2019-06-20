const uuidv4 = require('uuid/v4');
const { getExtension } = require('../helpers/fileInfo');

function generateFilename(inputFile, { prefix = 'crop', sufix = '' }) {
  const uuid = uuidv4(prefix + sufix);
  const ext = getExtension(inputFile);

  return `${prefix}-${uuid}-${sufix}.${ext}`;
}

module.exports = generateFilename;

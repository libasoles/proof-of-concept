const path = require('path');
const uuidv4 = require('uuid/v4');

function generateFilename(inputFile, { prefix = 'crop', sufix = '' }) {
  const uuid = uuidv4(prefix + sufix);
  const ext = path.extname(inputFile);

  return `${prefix}-${uuid}-${sufix}${ext}`;
}

module.exports = generateFilename;

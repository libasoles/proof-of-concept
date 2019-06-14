const path = require('path');
const uuidv3 = require('uuid/v3');

function generateFilename(inputFile, { prefix = 'crop', sufix = '' }) {
  const uuid = uuidv3(prefix + sufix, uuidv3.URL);
  const ext = path.extname(inputFile);

  return `${prefix}-${uuid}-${sufix}${ext}`;
}

module.exports = generateFilename;

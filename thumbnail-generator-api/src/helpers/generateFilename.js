const path = require('path');
const uuidv4 = require('uuid/v4');

async function generateFilename(inputFile, { prefix = 'crop', sufix = '' }) {
  const uuid = await uuidv4(prefix + sufix);
  const ext = await path.extname(inputFile);

  return `${prefix}-${uuid}-${sufix}${ext}`;
}

module.exports = generateFilename;

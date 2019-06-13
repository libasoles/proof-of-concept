const fs = require('fs');
const mime = require('mime-types');

function equal(a) {
  return b => a === b;
}

const checkMaxSize = maxSize => (image) => {
  const fileInfo = fs.statSync(image);

  if (fileInfo.size <= maxSize) return true;

  throw new Error(`Image too big (max allowed: ${maxSize / 1024 / 1024}Mb)`);
};

const checkMimeType = mimeTypes => (image) => {
  const mType = mime.lookup(image);

  if (mimeTypes.some(equal(mType))) return true;

  throw new Error('Mime-type not valid');
};

const setupValidators = (validationConfig) => {
  const { mimeTypes, maxSize } = validationConfig;

  return [
    checkMimeType(mimeTypes),
    checkMaxSize(maxSize),
  ];
}


function createImageValidator(config) {
  const validators = setupValidators(config);

  return image => validators.forEach(validate => validate(image));
}

module.exports = createImageValidator;

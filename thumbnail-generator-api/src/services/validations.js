const fs = require('fs');
const mime = require('mime-types');

const ValidationError = require('./ValidationError');

function equal(a) {
  return b => a === b;
}

const checkMaxSize = maxSize => (image) => {
  const fileInfo = fs.statSync(image);

  if (fileInfo.size <= maxSize) return true;

  throw new ValidationError(`Image too big (max allowed: ${maxSize / 1024 / 1024}Mb)`);
};

const checkMimeType = mimeTypes => (image) => {
  const mType = mime.lookup(image);

  if (mimeTypes.some(equal(mType))) return true;

  throw new ValidationError('Mime-type not valid');
};

const validatorsMap = {
  mimeTypes: checkMimeType,
  maxSize: checkMaxSize,
};

function setupValidators(criteria) {
  const validators = [];

  Object.keys(criteria).forEach((name) => {
    const restriction = criteria[name];
    const validator = validatorsMap[name];

    validators.push(validator(restriction));
  });

  return validators;
}

function createImageValidator(criteria) {
  const validators = setupValidators(criteria);

  return (image) => {
    validators.forEach(check => check(image));
  };
}

module.exports = createImageValidator;

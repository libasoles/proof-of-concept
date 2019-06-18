const config = require('./config');
const { createImageCrops } = require('./services/resizer');
const createImageValidator = require('./services/validations');
const storageFactory = require('./services/storage/storageFactory');

async function execute(image) {
  const { dimensions } = config.output;
  const validateImage = createImageValidator(config.validation.criteria);
  const storage = storageFactory(config.storage.default);

  validateImage(image);

  const paths = await createImageCrops({
    image, dimensions, storage,
  });

  return { paths };
}

module.exports = execute;

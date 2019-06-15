const config = require('./config');
const { createImageCrops } = require('./services/resizer');
const createImageValidator = require('./services/validations');
const storageFactory = require('./services/storage/storageFactory');

async function execute(image) {
  const { dimensions } = config.output;
  const validateImage = createImageValidator(config.validation.criteria);
  const storage = storageFactory(config.storage.default);

  try {
    validateImage(image);

    const paths = await createImageCrops({
      image, dimensions, storage,
    });

    return { paths };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return { error: e.message };
  }
}

module.exports = execute;

const config = require('./config');
const { createImageCrops } = require('./services/resizer');
const storageFactory = require('./services/storage/storageFactory');

async function execute(image) {
  const { dimensions } = config.output;
  const storage = storageFactory(config.storage.default);

  try {
    const paths = await createImageCrops({
      image, dimensions, storage,
    });

    console.log('Response: ', JSON.stringify(paths));
  } catch (e) {
    console.error(e);
  }
}

const inputFile = `${__dirname}/alice.jpg`;
execute(inputFile);

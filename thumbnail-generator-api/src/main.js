const config = require("./config");
const {createImageCrops} = require("./functions");
const storageFactory = require("./services/storageFactory");

async function execute(image) {
  const {dimensions} = config.output;
  const storage = storageFactory('aws-s3');

  try {
    const paths = await createImageCrops(image, dimensions, storage);

    console.log("Response: ", JSON.stringify(paths))
  } catch(e) {
    console.error(e);
  }
}

let inputFile = __dirname+"/alice.jpg"
execute(inputFile);
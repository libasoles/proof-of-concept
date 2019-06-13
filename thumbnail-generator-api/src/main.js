const config = require("./config");
const functions = require("./functions");
const S3CloudStorage = require("./services/S3CloudStorage");

function execute(image) {

  const {dimensions} = config.output;
  const {resize, generateFilename} = functions;

  const storage = new S3CloudStorage();

  dimensions.forEach(dimension => {
    const {width, height}  = dimension;
    const filename = generateFilename(image, `output-${width}x${height}`);

    resize(image, dimension);
    storage.store(image, filename);
  });
}


let inputFile = __dirname+"/alice.jpg"
execute(inputFile);
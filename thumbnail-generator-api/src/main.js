const config = require("./config");
const functions = require("./functions");

function process(inputFile) {

  const {dimensions} = config.output;
  const {resize, generateFilename} = functions;

  dimensions.forEach(dimension => {
    const {width, height}  = dimension;
    const filename = generateFilename(inputFile, `output-${width}x${height}`);

    resize(inputFile, dimension).toFile(filename);
  });
}


let inputFile = "alice.jpg"
process(inputFile);
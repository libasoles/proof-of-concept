const AWS = require('aws-sdk');
const mime = require('mime-types');
const config = require("./config");
const functions = require("./functions");

const s3 = new AWS.S3();

function store(image, filename) {
  const bucketName = process.env.AWS_S3_BUCKET;

  const bucketPromise = s3.putObject(
    {
      Bucket: bucketName,
      Key: filename,
      Body: image,
      ContentType: mime.lookup(image)
    }
  ).promise();

  bucketPromise.then(
    function(data) {
      console.log("Successfully uploaded data to " + bucketName + "/" + filename);
    }
  );
}

function execute(image) {

  const {dimensions} = config.output;
  const {resize, generateFilename} = functions;

  dimensions.forEach(dimension => {
    const {width, height}  = dimension;
    const filename = generateFilename(image, `output-${width}x${height}`);

    resize(image, dimension).toFile(filename);
    store(image, filename);
  });
}


let inputFile = __dirname+"/alice.jpg"
execute(inputFile);
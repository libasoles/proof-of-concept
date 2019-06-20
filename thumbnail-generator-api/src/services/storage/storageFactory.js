const util = require('util');
const S3 = require('aws-sdk/clients/s3');

const S3CloudStorage = require('./S3CloudStorage');
const config = require('../../config');

function createS3Storage(params) {
  const { STAGE, AWS_S3_BUCKET, AWS_STACK_REGION } = process.env;

  const bucket = params.bucket || `${AWS_S3_BUCKET}-${STAGE}`;
  const region = params.region || AWS_STACK_REGION;
  const basePath = util.format(config.output.s3.url, bucket, region);

  return new S3CloudStorage({
    service: new S3(),
    bucket,
    basePath,
  });
}

function storageFactory(type, params = {}) {
  if (type === 'aws-s3') {
    return createS3Storage(params);
  }

  return null;
}


module.exports = storageFactory;

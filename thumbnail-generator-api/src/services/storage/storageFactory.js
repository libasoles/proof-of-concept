const util = require('util');
const S3 = require('aws-sdk/clients/s3');

const S3CloudStorage = require('./S3CloudStorage');
const S3AsyncCloudStorage = require('./S3AsyncCloudStorage');
const config = require('../../config');

function createS3Storage(Store, params) {
  const { STAGE, AWS_S3_BUCKET, AWS_STACK_REGION } = process.env;

  const bucket = params.bucket || `${AWS_S3_BUCKET}-${STAGE}`;
  const region = params.region || AWS_STACK_REGION;
  const basePath = util.format(config.output.s3.url, bucket, region);

  return new Store({
    service: new S3(),
    bucket,
    basePath,
  });
}

function storageFactory(type, params = {}) {
  if (type === 'aws-s3') {
    return createS3Storage(S3CloudStorage, params);
  }

  if (type === 'aws-s3-async') {
    return createS3Storage(S3AsyncCloudStorage, params);
  }

  return null;
}


module.exports = storageFactory;

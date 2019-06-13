const AWS = require('aws-sdk');

const S3CloudStorage = require('./S3CloudStorage');
const config = require('../config');

function storageFactory(type, params = {}) {
  if (type === 'aws-s3') {
    return new S3CloudStorage({
      service: new AWS.S3(),
      basePath: config.output.s3.url,
      ...params,
    });
  }

  return null;
}

module.exports = storageFactory;

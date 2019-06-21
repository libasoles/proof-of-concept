const { getMimeType } = require('../../helpers/fileInfo');
const StorageError = require('./StorageError');

/**
 * Amazon aws storage.
 * Will not wait for S3 response, so it's not suitable for aws lambda,
 * because async operations will stop as soon as lambda finishes it's execution.
 */
class S3AsyncCloudStorage {
  constructor({
    service, bucket, basePath,
  }) {
    if (!service || !bucket || !basePath) {
      throw new TypeError('Missing arguments');
    }

    this.service = service;
    this.bucketName = bucket;
    this.url = basePath;
  }

  async store(file, outputFilename) {
    try {
      this.service.putObject({
        Bucket: this.bucketName,
        Key: outputFilename,
        Body: file,
        ContentEncoding: 'base64',
        ContentType: getMimeType(file),
      });

      return this.url + outputFilename;
    } catch (e) {
      throw new StorageError('Could not save the file', e);
    }
  }
}

module.exports = S3AsyncCloudStorage;

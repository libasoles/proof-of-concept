const { getMimeType } = require('../../helpers/fileInfo');
const StorageError = require('./StorageError');

/**
 * Amazon aws storage.
 */
class S3CloudStorage {
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
      await this.service.putObject({
        Bucket: this.bucketName,
        Key: outputFilename,
        Body: file,
        ContentEncoding: 'base64',
        ContentType: getMimeType(file),
      }).promise();

      return this.url + outputFilename;
    } catch (e) {
      throw new StorageError('Could not save the file', e);
    }
  }
}

module.exports = S3CloudStorage;

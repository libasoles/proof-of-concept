const util = require('util');
const mime = require('mime-types');

const StorageError = require('./StorageError');

/**
 * Amazon aws storage.
 * Requires correct env variables to work.
 */
class S3CloudStorage {
  constructor({ service, bucketName = null, basePath }) {
    this.service = service;
    this.bucketName = bucketName || process.env.AWS_S3_BUCKET;
    this.url = util.format(basePath, this.bucketName);
  }

  async store(file, outputFilename) {
    try {
      await this.service.putObject(
        {
          Bucket: this.bucketName,
          Key: outputFilename,
          Body: file,
          ContentType: mime.lookup(file),
        },
      ).promise();

      return this.url + outputFilename;
    } catch (e) {
      throw new StorageError('Could not save the file');
    }
  }
}

module.exports = S3CloudStorage;

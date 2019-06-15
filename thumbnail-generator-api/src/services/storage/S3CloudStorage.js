const util = require('util');
const mime = require('mime-types');
const PassThroughStream = require('stream').PassThrough;

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
      await this.stream({
        Bucket: this.bucketName,
        Key: outputFilename,
        Body: file,
        ContentType: mime.lookup(file),
      });

      return this.url + outputFilename;
    } catch (e) {
      throw new StorageError('Could not save the file');
    }
  }

  async stream(params) {
    const pass = new PassThroughStream();

    return {
      writeStream: pass,
      promise: this.service.putObject(params).promise(),
    };
  }
}

module.exports = S3CloudStorage;

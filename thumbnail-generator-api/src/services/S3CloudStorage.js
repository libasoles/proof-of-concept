const util = require('util');
const AWS = require('aws-sdk');
const mime = require('mime-types');

const config = require("../config");
const StorageError = require('./StorageError');

/**
 * Amazon aws storage.
 * Requires correct env variables to work.
 */
class S3CloudStorage {

  constructor(bucketName = null) {
    this.service = new AWS.S3();
    this.bucketName = bucketName || process.env.AWS_S3_BUCKET;
    this.url = util.format(config.output.s3.url, this.bucketName);
  }

  async store(image, filename) {

    try {
      await this.service.putObject(
        {
          Bucket: this.bucketName,
          Key: filename,
          Body: image,
          ContentType: mime.lookup(image)
        }
      ).promise();

      return this.url + filename;
    } catch(e) {
      console.error(e.getMessage());
      throw new StorageError("Could not save the file");
    }
  }
}

module.exports = S3CloudStorage;
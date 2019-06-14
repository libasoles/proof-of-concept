const StorageError = require('../StorageError');

class MockStorage {
  constructor({ basePath }) {
    this.path = basePath;
  }

  async store(file, outputFilename) {
    if (!file || !outputFilename) {
      throw new StorageError();
    }

    return this.path + outputFilename;
  }
}

module.exports = MockStorage;

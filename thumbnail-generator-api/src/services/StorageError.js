class StorageError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = StorageError;
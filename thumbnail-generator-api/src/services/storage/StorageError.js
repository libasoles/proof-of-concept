class StorageError extends Error {
  constructor(message) {
    super();
    this.name = 'StorageError';
    this.message = message;
  }
}

module.exports = StorageError;

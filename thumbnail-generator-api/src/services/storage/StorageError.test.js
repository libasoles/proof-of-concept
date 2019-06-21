const StorageError = require('./StorageError');

describe('StorageError', () => {
  it('should be an Error', () => {
    const error = new StorageError();
    expect(error instanceof Error).toBe(true);
  });

  it('should have a name', () => {
    const error = new StorageError();
    expect(error.name).toBe('StorageError');
  });
});

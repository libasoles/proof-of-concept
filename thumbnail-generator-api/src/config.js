module.exports = {
  validationCriteria: {
    mimeTypes: ['image/jpeg', 'image/png'],
    maxSize: 5 * 1024 * 1024,
  },
  output: {
    dimensions: [{
      width: 400,
      height: 300,
    }, {
      width: 160,
      height: 120,
    }, {
      width: 120,
      height: 120,
    }],
  },
};

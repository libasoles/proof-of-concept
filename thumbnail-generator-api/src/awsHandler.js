const execute = require('./main');
const ValidationError = require('./services/ValidationError');

module.exports.execute = async (event) => {
  const encodedImage = JSON.parse(event.body).image;
  const decodedImage = Buffer.from(encodedImage, 'base64');

  return execute(decodedImage).then(response => ({
    statusCode: 200,
    body: JSON.stringify(response),
  })).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e.statusCode, e);

    let statusCode = 500;

    if (e instanceof ValidationError) {
      statusCode = 422;
    }

    return {
      statusCode,
      body: JSON.stringify({ error: e.message }),
    };
  });
};

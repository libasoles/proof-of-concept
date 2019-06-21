const execute = require('./main');
const ValidationError = require('./services/ValidationError');

function convertToBase64(image) {
  return Buffer.from(image.replace(/^data:image\/\w+;base64,/, '').replace(/ /g, '+'), 'base64');
}

module.exports.execute = async (event) => {
  const encodedImage = JSON.parse(event.body).image;
  const decodedImage = convertToBase64(encodedImage);

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
      message: e.message,
    };
  });
};

const ValidationError = require('./services/ValidationError');
const execute = require('./main');

module.exports.execute = async (event, context, callback) => {
  let statusCode = 200;
  let response;

  try {
    response = execute();
  } catch (e) {
    if (e instanceof ValidationError) {
      statusCode = 422;
    } else {
      statusCode = 500;
    }

    // eslint-disable-next-line no-console
    console.error(e);

    response = { error: e.message };
  }

  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

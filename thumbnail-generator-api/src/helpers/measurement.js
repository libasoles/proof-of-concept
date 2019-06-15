const { performance } = require('perf_hooks');

async function measureTime(fn, params, {
  output = true,
} = {}) {
  const start = performance.now();
  const response = await fn(...params);
  const end = performance.now();
  const timeConsumed = end - start;

  if (output) {
    // eslint-disable-next-line no-console
    console.debug(fn.name, timeConsumed, ' ms');
  }

  return {
    response,
    timeConsumed,
  };
}

module.exports = {
  measureTime,
};

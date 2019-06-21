const fs = require('fs');
const execute = require('./main');
const { measureTime } = require('./helpers/measurement');

const inputFile = fs.readFileSync(`${__dirname}/__tests__/alice.jpg`);
const result = measureTime(execute, [inputFile]);

result.then(console.log);

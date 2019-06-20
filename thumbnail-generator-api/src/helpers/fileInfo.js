const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const fileType = require('file-type');

function getMimeType(file) {
  let mType;

  if (Buffer.isBuffer(file)) {
    mType = fileType(file).mime;
  } else {
    mType = mime.lookup(file);
  }

  return mType;
}

function getSize(file) {
  let fileSize;

  if (Buffer.isBuffer(file)) {
    fileSize = file.toString().length;
  } else {
    fileSize = fs.statSync(file).size;
  }

  return fileSize;
}

function getExtension(inputFile) {
  let extension;

  if (Buffer.isBuffer(inputFile)) {
    extension = fileType(inputFile).ext;
  } else {
    extension = path.extname(inputFile).replace(/\./g, '');
  }

  return extension;
}

module.exports = {
  getMimeType,
  getSize,
  getExtension,
};

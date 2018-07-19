/* eslint-disable no-console */

const fs = require('fs');
const rimraf = require('rimraf');

function makeDirIfDoesnotExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function removeDir(target) {
  if (fs.existsSync(target)) {
    rimraf.sync(target);
  }
}

module.exports = {
  makeDirIfDoesnotExist,
  removeDir,
};

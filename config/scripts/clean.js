// @flow
/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const chalk = require('chalk');
const { argv } = require('yargs');

let target = '';

switch (argv.target) {
  case 'coverage': {
    target = '../../coverage';
    break;
  }
  case 'dist': {
    target = '../../dist';
    break;
  }
  case 'flow': {
    target = '../../flow-typed/npm';
    break;
  }
  default: {
    console.log(`${chalk.red('invalid target option')}`);
    process.exit();
  }
}

if (!target) {
  console.log(`${chalk.red(`don't touch root`)}`);
  process.exit();
}

target = path.resolve(__dirname, target);

if (fs.existsSync(target)) {
  rimraf.sync(target);

  console.log(`${argv.target} ${chalk.green('✓')}`);
} else {
  console.log(chalk.gray(`${argv.target}`));
}

/* eslint-disable no-console */

import path from 'path';
import { argv } from 'yargs';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack.config.prod';

if (argv.port && typeof argv.port === 'number') {
  process.env.PORT = argv.port;
}

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

function handleCompile(target, callback) {
  return (err, stats) => {
    console.log(`Creating an optimized production build for ${target}...`);
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors(
        'Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.',
        stats.compilation.warnings,
      );
      process.exit(1);
    }

    console.log(chalk.green(`Compiled successfully (${target}).`));

    if (callback) {
      callback();
    }
  };
}

webpack(config).run(
  handleCompile('client-side', () => {
    const serverConfig = require('../webpack.config.prod.server').default; // eslint-disable-line
    webpack(serverConfig).run(handleCompile('server-side'));
  }),
);

/* eslint-disable no-console */

import chalk from 'chalk';
import webpack from 'webpack';
import config from '../config/webpack.config.prod';

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach((err) => {
    console.log(err.message || err);
    console.log();
  });
}

webpack(config).run((err, stats) => {
  console.log('Creating an optimized production build...');
  if (err) {
    printErrors('Failed to compile.', [err]);
    process.exit(1);
  }

  if (stats.compilation.errors.length) {
    printErrors('Failed to compile.', stats.compilation.errors);
    process.exit(1);
  }

  if (process.env.CI && stats.compilation.warnings.length) {
    printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', stats.compilation.warnings);
    process.exit(1);
  }

  console.log(chalk.green('Compiled successfully.'));
});

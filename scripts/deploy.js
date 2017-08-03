// @flow
/* eslint-disable no-console */

import { exec } from 'child_process';
import { argv } from 'yargs';
import chalk from 'chalk';

const TEST_HOSTNAME = 'test.*****.ge'; // here goes production hostname
const PRODUCTION_HOSTNAME = '*****.ge'; // here goes production hostname

function deploy(target: string) {
  console.error('deployment script has not been implemented yet');

  // console.log(chalk.dim(`deploying build from dist/ to ${target}`));
  // exec(`aws s3 sync dist/ s3://${target} --acl public-read`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.log(`stderr: ${stderr}`);
  // });
}

if (argv.target === 'test') {
  deploy(TEST_HOSTNAME);
} else if (argv.target === 'production') {
  deploy(PRODUCTION_HOSTNAME);
} else {
  console.log(chalk.red('Please specify deploy target using --target={target} flag'));
}

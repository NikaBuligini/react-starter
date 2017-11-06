import { argv } from 'yargs';

if (typeof argv.debug === 'string') {
  process.env.DEBUG = argv.debug;
}

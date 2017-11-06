/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ip from 'ip';
import { createLogger, format, transports } from 'winston';
// import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = format;

const divider = chalk.gray('\n-----------------------------------');

export const coreLogger = {
  // Called whenever there's an error on the server we want to print
  error: err => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}
      PID: ${chalk.magenta(process.pid)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

const logDirectory = path.resolve(__dirname, '../../logs');

// make directory if it doesn't exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const customFormat = combine(
  timestamp(),
  printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.File({
      filename: path.resolve(logDirectory, 'errors.log'),
      level: 'info',
    }),
    // new DailyRotateFile({
    //   filename: 'app',
    //   dirname: logDirectory,
    //   datePattern: 'yyyy-MM-dd.',
    //   prepend: true,
    //   format: customFormat,
    //   level: process.env.ENV === 'development' ? 'debug' : 'info',
    // }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.resolve(logDirectory, 'exceptions.log'),
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: customFormat }));
}

export default logger;

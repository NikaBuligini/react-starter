/* eslint-disable no-console, array-callback-return */

import log from 'npmlog';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();

export default (where, err, stats) => {
  if (err) {
    log.info('webpack', `${where} compiler had error:`, err);
    return false;
  }

  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    log.error('webpack', `${where} compiler had errors:`);
    jsonStats.errors.map(error => {
      console.log(pretty.render(error));
    });
    return false;
  }

  if (jsonStats.warnings.length > 0) {
    log.warn('webpack', `${where} compiler had warnings:`, jsonStats.warnings);
    return false;
  }

  return true;
};

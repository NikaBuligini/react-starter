// @flow

import { createError } from '../server-utils';

export default function losesRedisConnection(
  req: express$Request,
  res: express$Response,
  next: express$NextFunction,
) {
  if (!req.session) {
    return next(createError(500, 'connection with database is lost'));
  }

  return next();
}

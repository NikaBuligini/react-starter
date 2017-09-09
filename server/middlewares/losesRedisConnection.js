// @flow

export default function losesRedisConnection(
  req: express$Request,
  res: express$Response,
  next: Function,
) {
  if (!req.session) {
    return next(new Error('connection with database is lost')); // handle error
  }

  return next();
}

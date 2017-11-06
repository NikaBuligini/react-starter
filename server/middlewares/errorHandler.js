import createDebug from 'debug';
import statuses from 'statuses';

const debug = createDebug('app');

const production = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-unused-vars
export default function(err, req, res, next) {
  if (!req.xhr) {
    next(err);
    return;
  }

  let status = err.status || err.statusCode || 500;

  if (status < 400) {
    status = 500;
  }

  res.statusCode = status;

  const body = {
    status,
  };

  // show the stacktrace when not in production
  if (!production) body.stack = err.stack;

  // internal server errors
  if (status >= 500) {
    debug(err.stack);
    body.message = statuses[status];
    res.json(body);
    return;
  }

  // client errors
  body.message = err.message;

  if (err.code) body.code = err.code;
  if (err.name) body.name = err.name;
  if (err.type) body.type = err.type;

  res.json(body);
}

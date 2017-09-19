// @flow

import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

const templatePath = IS_DEVELOPMENT
  ? path.resolve(__dirname, '../../server/development.html')
  : path.resolve(__dirname, '../main/template.html');

let template = '';
if (fs.existsSync(templatePath)) {
  template = fs.readFileSync(templatePath, 'utf8');
}

type ReplacerContext = {
  [key: string]: string,
};

const replacer = (context: ReplacerContext) => (s: string, name: string) => context[name] || '';

function formatString(input: string, context: ReplacerContext) {
  return input.replace(/%(\w+)%/g, replacer(context));
}

export function writeError(msg: string, res: express$Response) {
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.write('ERROR!');
  res.end();
}

export function redirect(location: string, res: express$Response) {
  res.writeHead(303, { Location: location });
  res.end();
}

export function writeNotFound(res: express$Response) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('Not Found');
  res.end();
}

export function write(html: string, type: string, res: express$Response) {
  zlib.gzip(html, (err, result) => {
    res.writeHead(200, {
      'Content-Length': result.length,
      'Content-Type': type,
      'Content-Encoding': 'gzip',
    });
    res.write(result);
    res.end();
  });
}

export function createPage(html: string, preloadedState: ?Object, helmet: any, styleTags: string) {
  const context = {
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    styleTags,
    html,
    preloadedState: `
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
    `,
    devServer: IS_DEVELOPMENT
      ? '<script src="http://localhost:8080/webpack-dev-server.js"></script>'
      : '',
  };

  return formatString(template, context);
}

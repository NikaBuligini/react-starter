// @flow

import path from 'path';
import fs from 'fs';

let templatePath;
if (process.env.NODE_ENV === 'production') {
  templatePath = path.resolve(__dirname, '../main/template.html');
} else {
  templatePath = path.resolve(__dirname, '../../server/development.html');
}

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

export default function renderFullPage(
  html: string,
  preloadedState: ?Object,
  helmet: any,
  styleTags: string,
) {
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
  };

  return formatString(template, context);
}

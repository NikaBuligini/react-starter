// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createPage, write } from './server-utils';
import reducers from '../src/reducers';
import App from '../src/App';

import { setLocale } from '../src/actions';

const DEFAULT_LANGUAGE = 'en';
const ALLOWED_LANGUAGES = ['en', 'ka'];

export default function handleRequest(req: express$Request, res: express$Response) {
  const context = {};

  let { locale } = req.cookies;

  if (!locale || ALLOWED_LANGUAGES.indexOf(locale) === -1) {
    locale = DEFAULT_LANGUAGE;
    res.cookie('locale', locale, {
      maxAge: 7200000, // 2 hour
    });
  }

  // Create a new Redux store instance
  const store = createStore(reducers);

  store.dispatch(setLocale(locale));

  const sheet = new ServerStyleSheet();

  // Render the component to a string
  const markup = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
    ),
  );

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Grap helmet generated stuff. Use this to avoid memory leak
    const helmet = Helmet.renderStatic();

    const styleTags = sheet.getStyleTags();

    // Send the rendered page back to the client
    const html = createPage(markup, preloadedState, helmet, styleTags);
    write(html, 'text/html', res);
  }
}

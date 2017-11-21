// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import fakePersistor from './fakePersistor';
import PersistGate from '../src/utils/PersistGate';
import { createPage, write } from './server-utils';
import configureStore from './configureStore';
import App from '../src/App';

import { setLocale } from '../src/actions';

type AppStore = Store<*, *, *>;

function handleRender(req: express$Request, res: express$Response, store: AppStore) {
  const context = {};

  const sheet = new ServerStyleSheet();

  // Render the component to a string
  const markup = renderToString(
    sheet.collectStyles(
      <PersistGate persistor={fakePersistor} ignoreBootstrap>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PersistGate>,
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

    // req.cache(html, 60);

    write(html, 'text/html', res);
  }
}

function init(req: express$Request): AppStore {
  // Create a new Redux store instance
  const store = configureStore();

  store.dispatch(setLocale(req.cookies.locale));

  return store;
}

type Resolve = (
  req: express$Request,
  store: AppStore,
  render: (store: AppStore) => void,
  next: express$NextFunction,
) => void;

export function handler(resolve: Resolve) {
  return (req: express$Request, res: express$Response, next: express$NextFunction) =>
    resolve(req, init(req), (store: AppStore) => handleRender(req, res, store), next);
}

export default function handleRequest(req: express$Request, res: express$Response) {
  handleRender(req, res, init(req));
}

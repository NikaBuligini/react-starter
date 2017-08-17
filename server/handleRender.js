// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderFullPage from './renderFullPage';
import reducers from '../src/reducers';
import App from '../src/App';

export default function handleRender(req: express$Request, res: express$Response) {
  const context = {};

  // Create a new Redux store instance
  const store = createStore(reducers);

  const sheet = new ServerStyleSheet();

  // Render the component to a string
  const html = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
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
    res.send(renderFullPage(html, preloadedState, helmet, styleTags));
  }
}

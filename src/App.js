import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import withProgressBar from './hocs/ProgressBar';
import Layout from './Layout';
import Routes from './routes';

import LanguageProvider from './containers/providers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';

const enhance = compose(withRouter, withProgressBar);

const RawApp = enhance(() => (
  <Layout>
    <Routes />
  </Layout>
));

const App = () => (
  <LanguageProvider messages={translationMessages}>
    <RawApp />
  </LanguageProvider>
);

export default App;

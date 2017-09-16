import React from 'react';
import withProgressBar from './hocs/ProgressBar';
import Layout from './Layout';
import Routes from './routes';

import LanguageProvider from './containers/providers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';

const RawApp = withProgressBar(() => (
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

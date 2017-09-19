import React from 'react';
import Layout from './Layout';
import Routes from './routes';

import LanguageProvider from './containers/providers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';

const RawApp = () => (
  <Layout>
    <Routes />
  </Layout>
);

const App = () => (
  <LanguageProvider messages={translationMessages}>
    <RawApp />
  </LanguageProvider>
);

export default App;

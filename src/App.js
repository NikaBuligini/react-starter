import React from 'react';
import Layout from './Layout';
import Routes from './routes';

import LanguageProvider from './containers/providers/LanguageProvider';

// Import i18n messages
import { translationMessages } from './i18n';

const App = () => (
  <LanguageProvider messages={translationMessages}>
    <Layout>
      <Routes />
    </Layout>
  </LanguageProvider>
);

export default App;

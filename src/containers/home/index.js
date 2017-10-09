// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import HelixLoadingIndicator from '../../components/LoadingIndicator/Helix';

const Home = () => (
  <div>
    <Helmet>
      <title>Home - Title</title>
    </Helmet>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <FormattedMessage id="containers.home.Greeting" />
          <div>
            <HelixLoadingIndicator />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;

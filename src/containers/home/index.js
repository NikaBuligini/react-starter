import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

const Home = () => (
  <div>
    <Helmet>
      <title>Home - Title</title>
    </Helmet>
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <FormattedMessage id="containers.home.Greeting" />
        </div>
      </div>
    </div>
  </div>
);

export default Home;

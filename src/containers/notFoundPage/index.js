import React from 'react';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

import messages from './messages';

const NotFound = () => (
  <div>
    <Helmet>
      <title>Home - Title</title>
    </Helmet>
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <h5>
            <FormattedMessage {...messages.header} />
          </h5>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;

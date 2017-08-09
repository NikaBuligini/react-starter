import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () =>
  <div>
    <Helmet>
      <title>Home - Title</title>
    </Helmet>
    <div className="container">
      <div className="row">
        <div className="col-md-offset-2 col-md-8">Home</div>
      </div>
    </div>
  </div>;

export default Home;

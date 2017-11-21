import React from 'react';

const Container = ({ children }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">{children}</div>
    </div>
  </div>
);

export default Container;

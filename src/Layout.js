// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { Navigation, Footer, NAVIGATION_HEIGHT, FOOTER_HEIGHT } from './partials';
import { Routes } from './constants';
import { logout } from './actions';

const MainContent = styled.div`
  min-height: calc(100vh - ${NAVIGATION_HEIGHT + FOOTER_HEIGHT}px);
`;

class Layout extends React.Component {
  static defaultProps = {
    children: null,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.redirectToSignIn && nextProps.redirectToSignIn) {
      this.props.logout(() => {
        this.props.history.push(Routes.signin);
      });
    }
  }

  props: {
    logout: Function => void,
    children?: React$Element<any>,
    redirectToSignIn: boolean,
    history: RouterHistory,
  };

  render() {
    return (
      <div>
        <Navigation />
        <MainContent>
          {this.props.children}
        </MainContent>
        <Footer />
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    null, // (state) => ({ redirectToSignIn: state.session.requireLogin }),
    { logout },
  ),
);

export default enhance(Layout);

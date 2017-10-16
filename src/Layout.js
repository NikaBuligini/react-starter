// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import { compose } from 'redux';
import withErrorBoundary from './hocs/ErrorBoundary';
import withProgressBar from './hocs/ProgressBar';
import { Navigation, Footer, NAVIGATION_HEIGHT, FOOTER_HEIGHT } from './partials';
import { Routes } from './constants';
import { logout } from './actions';

const MainContent = styled.div`
  min-height: calc(100vh - ${NAVIGATION_HEIGHT + FOOTER_HEIGHT}px);
`;

type Props = {
  logout: Function => void,
  children?: React$Element<any>,
  redirectToSignIn: boolean,
  history: RouterHistory,
};

class Layout extends React.Component<Props> {
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

  render() {
    return (
      <div>
        <Navigation />
        <MainContent>{this.props.children}</MainContent>
        <Footer />
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withErrorBoundary,
  connect(
    // state => ({ redirectToSignIn: state.session.requireLogin }),
    state => ({ isActive: state.progress.isActive }),
    { logout },
  ),
  withProgressBar,
);

export default enhance(Layout);

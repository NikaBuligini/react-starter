// @flow

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Routes } from '../constants';

export const HEIGHT = 50;

const Wrapper = styled.div`
  width: 100%;
  height: ${HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Link = styled(NavLink)`
  color: #00a3e0;
  text-decoration: none;
  font-size: 18px;
  margin: 0 10px;

  &.active {
    color: palevioletred;
  }
`;

const Navigation = () => (
  <Wrapper>
    <Link exact to={Routes.home}>
      Home
    </Link>
    <Link exact to={Routes.signIn}>
      Sign In
    </Link>
  </Wrapper>
);

export default Navigation;

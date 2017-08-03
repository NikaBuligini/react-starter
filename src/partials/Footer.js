// @flow

import React from 'react';
import styled from 'styled-components';

export const HEIGHT = 60;

const Wrapper = styled.div`
  height: ${HEIGHT}px;
  background: #3c3c3c;
  color: #fff;

  .footer__inner {
    padding: 20px;
    display: flex;
    align-items: center;
  }
`;

const Footer = () =>
  <Wrapper>
    <div className="footer__inner">©Example</div>
  </Wrapper>;

export default Footer;

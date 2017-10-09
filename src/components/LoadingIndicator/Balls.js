// @flow

import React from 'react';
import styled, { keyframes } from 'styled-components';
import times from 'lodash/times';

const BALL_COLLOR = '#3c3c3c';
const delays = [1, 1.1, 1.05, 1.15, 1.1, 1.05, 1];

const right = keyframes`
  0% {
    transform: translate(-15px);
  }
  50% {
    transform: translate(15px);
  }
  100% {
    transform: translate(-15px);
  }
`;

const left = keyframes`
  0% {
    transform: translate(15px);
  }
  50% {
    transform: translate(-15px);
  }
  100% {
    transform: translate(15px);
  }
`;

export const Wrapper = styled.div`
  width: 200px;
  padding: 24px 0;
  margin: 0 auto;
`;

const Ball = styled.div`
  width: 10px;
  height: 10px;
  margin: 10px auto;
  border-radius: 50px;
  ${props => `
    background: ${BALL_COLLOR};
    animation: ${props.index % 2 ? right : left} ${delays[props.index]}s infinite ease-in-out;
  `};
`;

const Rubik = () => <Wrapper>{times(7).map(i => <Ball key={i} index={i} />)}</Wrapper>;

export default Rubik;

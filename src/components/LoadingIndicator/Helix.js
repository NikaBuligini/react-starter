// @flow

import React from 'react';
import styled, { keyframes } from 'styled-components';
import times from 'lodash/times';

const TIME = 2;
const DELAY = 0.1;
const PADDING = 0.6;
const PRIMARY_COLOR = '#fdb37f';
const SECONDARY_COLOR = '#999';

const DNARotation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
    left: 40%;
    z-index: 0;
  }
  25%  {
    opacity: 1;
    transform: scale(1.8);
  }
  50%  {
    opacity: 1;
    left: 60%;
    z-index: 1;
    transform: scale(1);
  }
  75%  {
    opacity: 1;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    left: 40%;
    z-index: 0;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 15rem;
  height: 15rem;
  transform: rotate(-90deg) scaleX(-1);
`;

function ballSpecificAnimation(props) {
  let finalDelay = props.index * DELAY;

  if (props.index % 2) {
    finalDelay += TIME / 2;
  }

  return `animation: ${DNARotation} ${TIME}s ${finalDelay}s infinite ease-in-out;`;
}

const Ball = styled.div`
  position: absolute;
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  background: white;
  border-radius: 1rem;
  opacity: 0;
  ${props => `
    top: ${props.index * PADDING}rem;
    background: ${props.color};
    ${ballSpecificAnimation(props)}
  `};
`;

type Props = {
  iteration: number,
};

const Helix = ({ iteration }: Props) => (
  <Wrapper>
    {times(iteration).map(i => (
      <Ball key={i} index={i} color={i % 2 ? PRIMARY_COLOR : SECONDARY_COLOR} />
    ))}
  </Wrapper>
);

Helix.defaultProps = {
  iteration: 26,
};

export default Helix;

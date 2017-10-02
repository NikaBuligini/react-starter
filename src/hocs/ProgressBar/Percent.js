// @flow

import styled from 'styled-components';

type Props = {
  percent: number,
};

export default styled.div`
  background: #77b6ff;
  transition: all 400ms ease;
  height: 2px;
  width: ${({ percent }: Props) => (percent <= 0 ? 0 : percent)}%;
  opacity: ${({ percent }: Props) => (percent >= 99.9 ? 0 : 1)};
  box-shadow: 0 0 10px rgba(119, 182, 255, 0.7);
`;

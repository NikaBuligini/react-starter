import { injectGlobal } from 'styled-components';
import './index.scss';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  a {
    color: #00a3e0;
    text-decoration: none;
    cursor: pointer;

    &:hover, &:focus, &:active, &.active {
      color: palevioletred;
    }
  }
`;

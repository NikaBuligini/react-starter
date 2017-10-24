// @flow

import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';

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

  .language-switch {
    margin-left: 12px;
  }
`;

type Props = {
  locale: string,
};

class Footer extends React.Component<Props> {
  handleLanguageChange = (event: SyntheticInputEvent<*>) => {
    Cookies.set('locale', event.target.value);

    global.location.reload();
  };

  render() {
    return (
      <Wrapper>
        <div className="footer__inner">
          ©Example
          <select
            className="language-switch"
            value={this.props.locale}
            onChange={this.handleLanguageChange}
          >
            <option value="en">en</option>
            <option value="ka">ka</option>
          </select>
        </div>
      </Wrapper>
    );
  }
}

type StoreState = {
  locale: string,
};

const mapStateToProps: MapStateToProps<StoreState, Props, *> = ({ locale }) => ({ locale });

export default connect(mapStateToProps)(Footer);

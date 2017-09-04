// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeLanguage } from '../actions';

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
  changeLanguage: (locale: string) => void,
  locale: string,
};

class Footer extends React.Component<Props> {
  handleLanguageChange = (event: SyntheticInputEvent<*>) => {
    console.log(event.target.value);
    this.props.changeLanguage(event.target.value);
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

function mapStateToProps(state) {
  const { session } = state;
  return {
    locale: session.language,
  };
}

export default connect(mapStateToProps, {
  changeLanguage,
})(Footer);

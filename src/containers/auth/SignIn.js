// @flow

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Contributor from './Contributor';
import { loadContributors } from '../../actions';
import { getContributors } from '../../selectors';

const OWNER = 'facebook';
const REPO = 'react';

const ContributorsWrapper = styled.div`margin-bottom: 12px;`;

const ContributorList = ({
  isFetching,
  contributors,
}: {
  isFetching: boolean,
  contributors: Array<Object>,
}) => {
  if (isFetching) {
    return <span>Loading...</span>;
  }

  return (
    <ContributorsWrapper>
      {contributors.map(contributor => <Contributor key={contributor.id} {...contributor} />)}
    </ContributorsWrapper>
  );
};

type Props = {
  loadContributors: (owner: string, repo: string) => void,
  isFetching: boolean,
  contributors: Array<Object>,
};

class SignIn extends React.Component<Props> {
  componentDidMount() {
    this.props.loadContributors(OWNER, REPO);
  }

  render() {
    const { isFetching, contributors } = this.props;

    return (
      <div>
        <Helmet>
          <title>Sign In - Title</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>Contributors for {`${OWNER}/${REPO}`}:</h4>
              <ContributorList isFetching={isFetching} contributors={contributors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => getContributors(state, OWNER, REPO), { loadContributors })(SignIn);

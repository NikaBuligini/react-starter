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
  onReload,
}: {
  isFetching: boolean,
  contributors: Array<Object>,
  onReload: Event => void,
}) => {
  if (isFetching) {
    return (
      <span>
        Loading... <code>(Specially debounced for 5 seconds)</code>
      </span>
    );
  }

  return (
    <ContributorsWrapper>
      <div>
        <a onClick={onReload}>reload</a>
      </div>
      {contributors.map(contributor => <Contributor key={contributor.id} {...contributor} />)}
    </ContributorsWrapper>
  );
};

type Props = {
  loadContributors: (owner: string, repo: string, force: boolean) => void,
  isFetching: boolean,
  contributors: Array<Object>,
};

class Cotributors extends React.Component<Props> {
  componentDidMount() {
    this.loadContributors();
  }

  handleReload = (event: Event) => {
    event.preventDefault();

    this.loadContributors(true);
  };

  loadContributors = (force: boolean = false) => {
    this.props.loadContributors(OWNER, REPO, force);
  };

  render() {
    const { isFetching, contributors } = this.props;

    return (
      <div>
        <Helmet>
          <title>Contributors - Title</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4>Contributors for {`${OWNER}/${REPO}`}.</h4>
              <ContributorList
                isFetching={isFetching}
                contributors={contributors}
                onReload={this.handleReload}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => getContributors(state, OWNER, REPO), { loadContributors })(
  Cotributors,
);

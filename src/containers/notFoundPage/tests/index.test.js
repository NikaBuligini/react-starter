import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import NotFound from '../index';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(<NotFound />);
    expect(
      renderedComponent.contains(
        <h5>
          <FormattedMessage
            id="containers.NotFoundPage.header"
            defaultMessage={'Page not found.'}
          />
        </h5>,
      ),
    ).toEqual(true);
  });
});

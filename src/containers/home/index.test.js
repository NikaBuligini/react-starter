import React from 'react';
import renderer from 'react-test-renderer';
import { wrapWithIntl } from '../../utils/intl-enzyme-test-helper';
import Home from './index';

describe('<Home />', () => {
  it('should render the Home page', () => {
    const component = renderer.create(wrapWithIntl(<Home />, 'en'));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

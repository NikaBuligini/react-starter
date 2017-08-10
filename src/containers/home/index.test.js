import React from 'react';
import renderer from 'react-test-renderer';
import Home from './index';

test('renders Home component', () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

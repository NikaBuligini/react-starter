import React from 'react';
import Home from './index';
import renderer from 'react-test-renderer';

test('renders Home component', () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { wrapWithProvider } from '../../utils/redux-enzyme-test-helper';
import { wrapWithRouter } from '../../utils/router-enzyme-test-helper';
import { Footer, Navigation } from '../index';

describe('<Partials />', () => {
  it('should match Footer snapshot', () => {
    const component = renderer.create(wrapWithProvider(<Footer />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have select node', () => {
    const renderedComponent = mount(wrapWithProvider(<Footer />));
    expect(renderedComponent.find('.language-switch').length).toBe(1);
  });

  it('should match Navigation snapshot', () => {
    const component = renderer.create(wrapWithRouter(<Navigation />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match Navigation snapshot when route is /contributors', () => {
    const component = renderer.create(
      wrapWithRouter(<Navigation />, { initialEntries: ['/contributors'] }),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

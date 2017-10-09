import React from 'react';
import { render, shallow } from 'enzyme';

import LoadingIndicator, { Wrapper } from '../index';

describe('<LoadingIndicator />', () => {
  it('should render 12 divs', () => {
    const renderedComponent = render(<LoadingIndicator />);
    expect(renderedComponent.find('div').length).toBe(12);
  });

  describe('<Wrapper />', () => {
    it('should render an <div> tag', () => {
      const renderedComponent = shallow(<Wrapper />);
      expect(renderedComponent.type()).toEqual('div');
    });

    it('should have a className attribute', () => {
      const renderedComponent = shallow(<Wrapper />);
      expect(renderedComponent.prop('className')).toBeDefined();
    });

    it('should adopt a valid attribute', () => {
      const id = 'test';
      const renderedComponent = shallow(<Wrapper id={id} />);
      expect(renderedComponent.prop('id')).toEqual(id);
    });

    it('should not adopt an invalid attribute', () => {
      const renderedComponent = shallow(<Wrapper attribute={'test'} />);
      expect(renderedComponent.prop('attribute')).toBeUndefined();
    });
  });
});

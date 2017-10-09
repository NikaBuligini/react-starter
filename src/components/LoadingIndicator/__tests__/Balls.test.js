import React from 'react';
import { render } from 'enzyme';

import Balls from '../Balls';

describe('<Balls />', () => {
  it('should render 7 divs', () => {
    const renderedComponent = render(<Balls />);
    expect(renderedComponent.find('div').length).toBe(7);
  });
});

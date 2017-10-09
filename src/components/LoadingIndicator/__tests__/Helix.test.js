import React from 'react';
import { render } from 'enzyme';

import Helix from '../Helix';

describe('<Helix />', () => {
  it('should render 26 divs', () => {
    const renderedComponent = render(<Helix />);
    expect(renderedComponent.find('div').length).toBe(26);
  });
});

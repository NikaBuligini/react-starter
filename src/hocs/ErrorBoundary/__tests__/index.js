import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { withErrorBoundary } from '../index';

let clock = null;

describe('withErrorBoundary()', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  function Component() {
    return <div />;
  }

  const HocComponent = withErrorBoundary(Component);

  it('should exist', () => {
    const renderedComponent = mount(<HocComponent />);

    expect(renderedComponent.find(Component).length).toBe(1);
  });
});

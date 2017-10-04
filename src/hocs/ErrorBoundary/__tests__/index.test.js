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

  it('should initially have state.hasError = false', () => {
    const renderedComponent = mount(<HocComponent />);

    expect(renderedComponent.state().hasError).toBeFalsy();
  });

  it('should render error message', () => {
    const renderedComponent = mount(<HocComponent />);
    renderedComponent.setState({ hasError: true });
    const containsErrorMessage = renderedComponent.contains(
      <div>Sorry, something went wrong.</div>,
    );
    expect(containsErrorMessage).toBeTruthy();
  });

  it('should call sendToErrorReporting', () => {
    const mockCallback = jest.fn();
    const renderedComponent = mount(<HocComponent sendToErrorReporting={mockCallback} />);
    const inst = renderedComponent.instance();
    inst.componentDidCatch();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

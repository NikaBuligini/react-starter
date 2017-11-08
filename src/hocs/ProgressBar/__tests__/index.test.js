import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import withProgressBar from '../index';
import ProgressBar from '../ProgressBar';

let clock = null;

describe('withProgressBar()', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  function Component() {
    return <div />;
  }

  const HocComponent = withProgressBar(Component);

  it('should exist', () => {
    const renderedComponent = mount(<HocComponent />);

    expect(renderedComponent.find(Component).length).toBe(1);
  });

  it('should render <ProgressBar />', () => {
    const renderedComponent = mount(<HocComponent />);

    expect(renderedComponent.find(ProgressBar).length).toBe(1);
  });

  it('should initially have state.progress = -1', () => {
    const renderedComponent = mount(<HocComponent />);

    expect(renderedComponent.state().progress).toBe(-1);
  });

  it('should update state.progress when called updateProgress()', () => {
    const renderedComponent = mount(<HocComponent />);

    const inst = renderedComponent.instance();
    inst.updateProgress(10);
    expect(renderedComponent.state().progress).toBe(10);
  });

  it('should update state.progress to 0 when progress activated', () => {
    const renderedComponent = mount(<HocComponent isActive={false} />);
    renderedComponent.setProps({ isActive: true });
    expect(renderedComponent.state().progress).toBe(0);
  });

  it('should update state.progress to 100 when progress deactivated', () => {
    const renderedComponent = mount(<HocComponent isActive />);
    renderedComponent.setState({ progress: 30 });
    renderedComponent.setProps({ isActive: false });
    expect(renderedComponent.state().progress).toBe(100);
  });

  it('should have displayName', () => {
    const renderedComponent = mount(<HocComponent />);
    const inst = renderedComponent.instance();
    expect(inst.constructor.displayName).toBe('withProgressBar(Component)');
  });
});

import analyticsMiddleware from '../analytics';

describe('analytics middleware', () => {
  const doDispatch = () => {};
  const doGetState = () => {};
  const nextHandler = analyticsMiddleware({ dispatch: doDispatch, getState: doGetState });

  it('should pass action to next', () => {
    const actionObj = {};
    const actionHandler = nextHandler(action => {
      expect(action).toBe(actionObj);
    });

    actionHandler(actionObj);
  });
});

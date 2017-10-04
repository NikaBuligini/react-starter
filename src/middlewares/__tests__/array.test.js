import arrayMiddleware from '../array';

describe('array middleware', () => {
  const doDispatch = () => {};
  const doGetState = () => {};
  const nextHandler = arrayMiddleware({ dispatch: doDispatch, getState: doGetState });

  it('should pass action to next', () => {
    const actionObj = {};
    const actionHandler = nextHandler(action => {
      expect(action).toBe(actionObj);
    });

    actionHandler(actionObj);
  });

  it('should call next twice for array of actions', () => {
    const actions = [{}, {}];
    const mockedCallback = jest.fn();
    const actionHandler = nextHandler(mockedCallback);

    actionHandler(actions);

    expect(mockedCallback.mock.calls.length).toBe(2);
  });
});

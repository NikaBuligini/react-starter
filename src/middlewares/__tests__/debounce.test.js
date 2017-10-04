import debounceMiddleware from '../debounce';

jest.useFakeTimers();

describe('debounce middleware', () => {
  const doDispatch = () => {};
  const doGetState = () => {};
  const nextHandler = debounceMiddleware({ dispatch: doDispatch, getState: doGetState });

  it('should return a function to handle next', () => {
    expect(typeof nextHandler).toMatch('function');
    expect(nextHandler.length).toBe(1);
  });

  describe('handle action', () => {
    it('should pass action to next if not contains debounce value', () => {
      const actionObj = {};
      const actionHandler = nextHandler(action => {
        expect(action).toBe(actionObj);
      });

      actionHandler(actionObj);
    });

    it('should wait for 1 second before handle', () => {
      const actionObj = { debounce: 1000 };
      const actionHandler = nextHandler(action => {
        expect(action).toBe(actionObj);
      });

      actionHandler(actionObj);

      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(1000);
    });

    it('should remove debounce value', () => {
      const actionObj = { debounce: 1000 };
      const mockedCallback = jest.fn();
      const actionHandler = nextHandler(mockedCallback);

      actionHandler(actionObj);

      expect(mockedCallback).not.toBeCalled();

      // Fast-forward until all timers have been executed
      jest.runTimersToTime(1000);

      expect(mockedCallback).toBeCalled();
      expect(mockedCallback.mock.calls.length).toBe(1);

      // should have removed debounce property
      expect(mockedCallback).toBeCalledWith({});
      expect(mockedCallback).not.toBeCalledWith({ debounce: 1000 });
    });
  });
});

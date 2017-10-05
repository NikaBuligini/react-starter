import reducer, { resetProgressCounter } from '../progress';

describe('progress reducer', () => {
  beforeEach(() => {
    resetProgressCounter();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isActive: false,
      fetchStatus: {},
    });
  });

  it('should toggle progress', () => {
    const state = {
      isActive: false,
      fetchStatus: {},
    };

    const action = {
      progressId: 'unique-id',
    };

    const reducedState = reducer(state, action);

    expect(reducedState).toEqual({
      isActive: true,
      fetchStatus: {
        'unique-id': 'loading',
      },
    });

    expect(reducer(reducedState, action)).toEqual({
      isActive: false,
      fetchStatus: {
        'unique-id': 'loaded',
      },
    });
  });
});

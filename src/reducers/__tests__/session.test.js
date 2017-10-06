import reducer from '../session';
import * as ActionTypes from '../../actions/auth';

describe('session reducer', () => {
  it('should return initial state', () => {
    const expectedState = {
      user: {},
      userId: null,
      redirectUrl: null,
    };

    expect(reducer(undefined, {})).toEqual(expectedState);
  });

  it('should return initial state after logout', () => {
    const state = {
      user: {
        id: 1,
        name: 'Jon Doe',
      },
      userId: 1,
      redirectUrl: null,
    };

    const expectedState = {
      user: {},
      userId: null,
      redirectUrl: null,
    };

    expect(reducer(state, { type: ActionTypes.LOGOUT })).toEqual(expectedState);
  });
});

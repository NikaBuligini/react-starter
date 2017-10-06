import { entities, locale } from '../index';
import { SET_LOCALE } from '../../actions/locale';

describe('index reducers', () => {
  describe('entities reducer', () => {
    it('should return initial state', () => {
      expect(entities(undefined, {})).toEqual({});
    });

    it('should merge entities', () => {
      const state = {};

      const action = {
        response: {
          entities: {
            users: {
              1: {
                id: 1,
                name: 'Jon Doe',
              },
            },
          },
        },
      };

      const expectedState = {
        users: {
          1: {
            id: 1,
            name: 'Jon Doe',
          },
        },
      };

      expect(entities(state, action)).toEqual(expectedState);
    });

    it('should merge entities when state is already populated', () => {
      const state = {
        users: {
          1: {
            id: 1,
            name: 'Jon Doe',
          },
        },
      };

      const action = {
        response: {
          entities: {
            users: {
              1: {
                id: 1,
                name: 'Jane Doe',
              },
            },
          },
        },
      };

      const expectedState = {
        users: {
          1: {
            id: 1,
            name: 'Jane Doe',
          },
        },
      };

      expect(entities(state, action)).toEqual(expectedState);
    });
  });

  describe('locale reducer', () => {
    it('should return initial state', () => {
      expect(locale(undefined, {})).toEqual('en');
    });

    it('should set language', () => {
      const action = { type: SET_LOCALE, locale: 'ka' };

      expect(locale('en', action)).toEqual('ka');
    });
  });
});

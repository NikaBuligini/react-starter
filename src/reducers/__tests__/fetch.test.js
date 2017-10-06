import sinon from 'sinon';

import reducer, { fetchStatus } from '../fetch';
import * as ContributorActionTypes from '../../actions/contributors';

describe('fetch reducers', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      contributorsByRepo: {},
    });
  });

  describe('fetchStatus()', () => {
    let clock = null;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should return function', () => {
      const config = {
        mapActionToKey: action => action.key,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
          ContributorActionTypes.CONTRIBUTORS_FAILURE,
        ],
      };

      const fetchReducer = fetchStatus(config);

      expect(typeof fetchReducer).toBe('function');
    });

    it('should throw exception if types array contains two item', () => {
      const config = {
        mapActionToKey: action => action.key,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
        ],
      };

      const wrappedFetchReducer = () => {
        fetchStatus(config);
      };

      expect(wrappedFetchReducer).toThrowError('Expected types to be an array of three elements.');
    });

    it('should throw exception if types array does not contain string items', () => {
      const config = {
        mapActionToKey: action => action.key,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
          1,
        ],
      };

      const wrappedFetchReducer = () => {
        fetchStatus(config);
      };

      expect(wrappedFetchReducer).toThrowError('Expected types to be strings.');
    });

    it('should throw exception if config mapActionToKey is not function', () => {
      const config = {
        mapActionToKey: undefined,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
          ContributorActionTypes.CONTRIBUTORS_FAILURE,
        ],
      };

      const wrappedFetchReducer = () => {
        fetchStatus(config);
      };

      expect(wrappedFetchReducer).toThrowError('Expected mapActionToKey to be a function.');
    });

    it('should obtain custom initial state', () => {
      const config = {
        mapActionToKey: action => action.key,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
          ContributorActionTypes.CONTRIBUTORS_FAILURE,
        ],
        initialState: { additionalProperty: 'some text' },
      };

      const fetchReducer = fetchStatus(config);

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_REQUEST,
        key: 'facebook/react',
      };

      const expectedState = {
        'facebook/react': {
          additionalProperty: 'some text',
          isFetching: true,
          loaded: false,
          loadedAt: null,
          errors: [],
        },
      };

      expect(fetchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should reduce success action without retrieveData', () => {
      const config = {
        mapActionToKey: action => action.key,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
          ContributorActionTypes.CONTRIBUTORS_FAILURE,
        ],
      };

      const fetchReducer = fetchStatus(config);

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_SUCCESS,
        key: 'facebook/react',
      };

      const expectedState = {
        'facebook/react': {
          isFetching: false,
          loaded: true,
          loadedAt: Date.now(),
          errors: [],
        },
      };

      expect(fetchReducer(undefined, action)).toEqual(expectedState);
    });

    it('should throw exception when key is not string or number', () => {
      const config = {
        mapActionToKey: action => action.key,
        types: [
          ContributorActionTypes.CONTRIBUTORS_REQUEST,
          ContributorActionTypes.CONTRIBUTORS_SUCCESS,
          ContributorActionTypes.CONTRIBUTORS_FAILURE,
        ],
      };

      const fetchReducer = fetchStatus(config);

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_REQUEST,
        key: undefined,
      };

      const wrappedFetchReducer = () => {
        fetchReducer(undefined, action);
      };

      expect(wrappedFetchReducer).toThrowError('Expected key to be a string or number.');
    });
  });

  describe('contributorsByRepo()', () => {
    let clock = null;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should throw exception when key is not provided', () => {
      const state = {
        contributorsByRepo: {},
      };

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_REQUEST,
        key: undefined,
      };

      const wrappedReducer = () => {
        reducer(state, action);
      };

      expect(wrappedReducer).toThrowError('Expected key to be a string or number.');
    });

    it('should start fetching on request action', () => {
      const state = {
        contributorsByRepo: {},
      };

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_REQUEST,
        key: 'facebook/react',
      };

      const expectedState = {
        contributorsByRepo: {
          'facebook/react': {
            ids: [],
            isFetching: true,
            loaded: false,
            loadedAt: null,
            errors: [],
          },
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should receive contributor ids on success action', () => {
      const state = {
        contributorsByRepo: {
          'facebook/react': {
            ids: [],
            isFetching: true,
            loaded: false,
            loadedAt: null,
            errors: [],
          },
        },
      };

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_SUCCESS,
        key: 'facebook/react',
        response: {
          result: [1, 2, 3],
        },
      };

      const expectedState = {
        contributorsByRepo: {
          'facebook/react': {
            ids: [1, 2, 3],
            isFetching: false,
            loaded: true,
            loadedAt: Date.now(),
            errors: [],
          },
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should reduce state to fail on failure action', () => {
      const state = {
        contributorsByRepo: {
          'facebook/react': {
            ids: [],
            isFetching: true,
            loaded: false,
            loadedAt: null,
            errors: [],
          },
        },
      };

      const action = {
        type: ContributorActionTypes.CONTRIBUTORS_FAILURE,
        key: 'facebook/react',
      };

      const expectedState = {
        contributorsByRepo: {
          'facebook/react': {
            ids: [],
            isFetching: false,
            loaded: true,
            loadedAt: Date.now(),
            errors: ['Something bad happened'],
          },
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });
});

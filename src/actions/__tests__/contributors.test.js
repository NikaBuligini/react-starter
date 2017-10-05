import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import api, { toggleProgress } from '../../middlewares/api';
import * as actions from '../contributors';

const middlewares = [thunk, api];
const mockStore = configureMockStore(middlewares);

describe('contributors actions', () => {
  beforeAll(() => {
    // turns off
    toggleProgress();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    // turns back on
    toggleProgress();
  });

  it('creates CONTRIBUTORS_SUCCESS when fetching contributors has been done', () => {
    nock('https://api.github.com')
      .get('/repos/facebook/react/contributors')
      .reply(200, [{ id: 1, name: 'Jon Doe' }]);

    const expectedActions = [
      { type: actions.CONTRIBUTORS_REQUEST, key: 'facebook/react' },
      {
        type: actions.CONTRIBUTORS_SUCCESS,
        debounce: 3000,
        key: 'facebook/react',
        response: {
          entities: {
            users: {
              1: { id: 1, name: 'Jon Doe' },
            },
          },
          result: [1],
        },
      },
    ];

    const store = mockStore({
      fetch: {
        contributorsByRepo: {},
      },
    });

    return store.dispatch(
      actions.loadContributors('facebook', 'react', false, () => {
        expect(store.getActions()).toEqual(expectedActions);
      }),
    );
  });

  it('should not dispatch action if there is already fetched contributors', () => {
    const expectedActions = [];

    const store = mockStore({
      entities: {
        users: {
          1: { id: 1, name: 'Jon Doe' },
        },
      },
      fetch: {
        contributorsByRepo: {
          'facebook/react': {
            isFetching: false,
            ids: [1],
          },
        },
      },
    });

    return store.dispatch(
      actions.loadContributors('facebook', 'react', false, () => {
        expect(store.getActions()).toEqual(expectedActions);
      }),
    );
  });

  it('should call api when force flag is active', () => {
    nock('https://api.github.com/')
      .get('/repos/facebook/react/contributors')
      .reply(200, [{ id: 2, name: 'Jane Doe' }]);

    const expectedActions = [
      { type: actions.CONTRIBUTORS_REQUEST, key: 'facebook/react' },
      {
        type: actions.CONTRIBUTORS_SUCCESS,
        debounce: 3000,
        key: 'facebook/react',
        response: {
          entities: {
            users: {
              2: { id: 2, name: 'Jane Doe' },
            },
          },
          result: [2],
        },
      },
    ];

    const store = mockStore({
      entities: {
        users: {
          1: { id: 1, name: 'Jon Doe' },
        },
      },
      fetch: {
        contributorsByRepo: {
          'facebook/react': {
            isFetching: false,
            ids: [1],
          },
        },
      },
    });

    return store.dispatch(
      actions.loadContributors('facebook', 'react', true, () => {
        expect(store.getActions()).toEqual(expectedActions);
      }),
    );
  });
});

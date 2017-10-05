import configureMockStore from 'redux-mock-store';

import { setLocale, SET_LOCALE } from '../locale';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('locale actions', () => {
  it('should create locale change action', () => {
    const expectedActions = [{ type: SET_LOCALE, locale: 'en' }];

    const store = mockStore({});

    store.dispatch(setLocale('en'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

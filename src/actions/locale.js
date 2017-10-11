// @flow

export const SET_LOCALE = 'SET_LOCALE';

export function setLocale(locale: string) {
  return {
    type: SET_LOCALE,
    locale,
  };
}

// @flow

export const CHANGE_LOCALE: string = 'CHANGE_LOCALE';

export function changeLocale(locale: string) {
  return (dispatch: Function) => {
    dispatch({
      type: CHANGE_LOCALE,
      locale,
    });
  };
}

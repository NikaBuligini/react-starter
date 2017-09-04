/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import kaLocaleData from 'react-intl/locale-data/ka';

import { DEFAULT_LOCALE } from './constants';

import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/ka.json';

addLocaleData(enLocaleData);
addLocaleData(kaLocaleData);

export const appLocales = ['en', 'ka'];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ka: formatTranslationMessages('ka', deTranslationMessages),
};

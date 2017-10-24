// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';
import { IntlProvider } from 'react-intl';

type Props = {
  locale: string,
  messages: Object,
  children: React$Element<*>,
};

const LanguageProvider = ({ locale, messages, children }: Props) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    {React.Children.only(children)}
  </IntlProvider>
);

type StoreState = {
  locale: string,
};

const mapStateToProps: MapStateToProps<StoreState, Props, *> = ({ locale }) => ({ locale });

export default connect(mapStateToProps)(LanguageProvider);

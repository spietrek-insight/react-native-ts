import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import 'intl-pluralrules'

import enUS from './translations/en_US.json'
import esSP from './translations/es_SP.json'
import frCA from './translations/fr_CA.json'

const RESOURCES = {
  en_US: enUS,
  es_SP: esSP,
  fr_CA: frCA,
}

/**
 * i18next
 */

void i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: RESOURCES,
    // language to use if translations in user language are not available
    fallbackLng: 'en_US',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  })

export default i18n

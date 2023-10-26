import i18next, { init } from 'i18next'

import deNs from '~/locales/de.json'

export const defaultNS = 'ns1'

init({
  debug: true,
  fallbackLng: 'de',
  defaultNS,
  resources: {
    de: {
      ns1: deNs,
    },
  },
})

export default i18next

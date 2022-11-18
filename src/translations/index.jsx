import resources from './resources';

export const config = {
  detection: {
    order: ['localStorage'],
  },
  interpolation: { escapeValue: false }, // React already does escaping
  ns: ['common'],
  defaultNS: 'common',
  whitelist: ['tr', 'en'],
  nonExplicitWhitelist: true,
  load: 'languageOnly',
  resources,
};

export { resources };

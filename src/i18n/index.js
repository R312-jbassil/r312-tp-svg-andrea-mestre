export const ui = {
  en: {
    nav: {
      language: 'Language',
    },
  },
  fr: {
    nav: {
      language: 'Langue',
    },
  },
};

export const defaultLang = 'fr';

export function getTranslation(locale, key) {
  const lang = ui[locale] || ui[defaultLang];
  const keys = key.split('.');
  let result = lang;
  for (const k of keys) {
    result = result?.[k];
  }
  return result || key;
}

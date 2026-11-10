// Shared by gatsby-node.ts (page creation) and the components, so it must stay
// free of React and JSON imports.
//
// To add a language: add its code here, add content/i18n/<code>.json, register
// it in src/i18n/index.tsx, and put texts in content/texts/<code>/.
export const DEFAULT_LOCALE = 'pl';
export const LOCALES = ['pl'] as const;
// Shown in the header switch; a code missing from LOCALES renders as inactive.
export const DISPLAYED_LOCALES = ['pl', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const TEXTS_PATH = '/texts';
export const PHOTOGRAPHY_PATH = '/photography';

// The default locale lives at the site root; every other one under /<code>.
export const localizedPath = (locale: string, path: string): string =>
  locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;

export const textPath = (locale: string, slug: string): string =>
  localizedPath(locale, `${TEXTS_PATH}/${slug}/`);

export const galleryPath = (locale: string, slug: string): string =>
  localizedPath(locale, `${PHOTOGRAPHY_PATH}/${slug}/`);

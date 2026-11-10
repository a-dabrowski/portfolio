import { createContext, useContext } from 'react';

import pl from '../../content/i18n/pl.json';
import { DEFAULT_LOCALE, Locale } from './locales';

export * from './locales';

// pl.json defines the shape; every other language file must match it.
export type Dictionary = typeof pl;

export const dictionaries: Record<Locale, Dictionary> = { pl };

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export const LocaleProvider = LocaleContext.Provider;

export const useLocale = (): Locale => useContext(LocaleContext);

export const useDictionary = (): Dictionary => dictionaries[useLocale()];

// format('Tekst {number} z {count}', { number: '01', count: '04' })
export const format = (
  template: string,
  values: Record<string, string | number>
): string =>
  template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in values ? String(values[name]) : placeholder
  );

export const padNumber = (value: number): string =>
  String(value).padStart(2, '0');

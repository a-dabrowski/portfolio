import pl from '../../content/news/pl.json';
import { Locale } from '../i18n/locales';
import { NewsEntry } from '../types';

// One file per language: content/news/<code>.json.
export const newsByLocale: Record<Locale, NewsEntry[]> = { pl };

// YYYY-MM-DD in the local time zone, the format of NewsEntry.date.
export const isoDate = (date: Date): string =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part) => String(part).padStart(2, '0'))
    .join('-');

// Entries dated after today are upcoming (soonest first); today and earlier
// are recent (latest first). ISO dates compare correctly as strings.
export const splitNews = (
  entries: NewsEntry[],
  today: string
): { upcoming: NewsEntry[]; recent: NewsEntry[] } => ({
  upcoming: entries
    .filter((entry) => entry.date > today)
    .sort((first, second) => first.date.localeCompare(second.date)),
  recent: entries
    .filter((entry) => entry.date <= today)
    .sort((first, second) => second.date.localeCompare(first.date)),
});

// "2026-12-05" -> { day: "05", monthAndYear: "gru 2026" }
export const newsDateParts = (
  date: string,
  locale: string
): { day: string; monthAndYear: string } => ({
  day: date.slice(8, 10),
  monthAndYear: `${new Intl.DateTimeFormat(locale, {
    month: 'short',
    timeZone: 'UTC',
  })
    .format(new Date(`${date}T00:00:00Z`))
    .replace('.', '')} ${date.slice(0, 4)}`,
});

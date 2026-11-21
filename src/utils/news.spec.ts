import { isoDate, newsDateParts, splitNews } from './news';

const entries = [
  { date: '2027-01-16', title: 'latest' },
  { date: '2026-12-05', title: 'later' },
  { date: '2026-03-14', title: 'older' },
  { date: '2026-11-19', title: 'today' },
  { date: '2026-11-18', title: 'yesterday' },
];

const titles = (list: Array<{ title: string }>) =>
  list.map((entry) => entry.title);

describe('splitNews', () => {
  it('lists entries dated after today as upcoming, soonest first', () => {
    expect(titles(splitNews(entries, '2026-11-19').upcoming)).toEqual([
      'later',
      'latest',
    ]);
  });

  it('lists entries dated today or earlier as recent, latest first', () => {
    expect(titles(splitNews(entries, '2026-11-19').recent)).toEqual([
      'today',
      'yesterday',
      'older',
    ]);
  });
});

describe('newsDateParts', () => {
  it('returns the day with its leading zero', () => {
    expect(newsDateParts('2026-12-05', 'pl').day).toBe('05');
  });

  it('returns the short month name and the year', () => {
    expect(newsDateParts('2026-12-05', 'pl').monthAndYear).toBe('gru 2026');
  });
});

describe('isoDate', () => {
  it('formats a local date as YYYY-MM-DD', () => {
    expect(isoDate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});

import { firstPullQuote, listTexts, yearRange } from './texts';
import { TextSummaryNode } from '../types';

const text = (slug: string, year: string): TextSummaryNode => ({
  id: slug,
  timeToRead: 1,
  fields: { slug },
  frontmatter: {
    title: slug,
    year,
    form: null,
    dek: null,
    stamp: null,
    scale: null,
  },
});

const newestFirst = [
  text('new', '2026'),
  text('middle', '2025'),
  text('old', '2024'),
];

describe('listTexts', () => {
  it('numbers texts from the oldest, so the newest gets the highest number', () => {
    expect(listTexts(newestFirst, 'pl').map((item) => item.number)).toEqual([
      '03',
      '02',
      '01',
    ]);
  });

  it('adds the localized URL of each text', () => {
    expect(listTexts(newestFirst, 'en')[0].path).toBe('/en/texts/new/');
  });
});

describe('yearRange', () => {
  it('joins the oldest and the newest year', () => {
    expect(yearRange(newestFirst)).toBe('2024–2026');
  });

  it('shows one year when all texts share it', () => {
    expect(yearRange([text('a', '2026'), text('b', '2026')])).toBe('2026');
  });

  it('is empty when there are no texts', () => {
    expect(yearRange([])).toBe('');
  });
});

describe('firstPullQuote', () => {
  it('returns the first pull quote and skips margin notes', () => {
    expect(
      firstPullQuote(
        '<aside class="text-note"><p>Note</p></aside><p>Body</p>' +
          '<blockquote>\n<p>First <em>quote</em>.</p>\n</blockquote>' +
          '<blockquote><p>Second.</p></blockquote>'
      )
    ).toBe('First <em>quote</em>.');
  });

  it('returns null for a text without a pull quote', () => {
    expect(firstPullQuote('<p>Body</p>')).toBeNull();
  });
});

import { format, galleryPath, localizedPath, padNumber, textPath } from '.';

describe('i18n helpers', () => {
  it('keeps the default language at the site root', () => {
    expect(localizedPath('pl', '/photography/')).toBe('/photography/');
  });

  it('prefixes every other language with its code', () => {
    expect(localizedPath('en', '/photography/')).toBe('/en/photography/');
  });

  it('builds a text URL from the markdown file name', () => {
    expect(textPath('en', 'tram')).toBe('/en/texts/tram/');
  });

  it('builds a gallery URL from the gallery slug', () => {
    expect(galleryPath('pl', 'balkan')).toBe('/photography/balkan/');
  });

  it('fills placeholders and leaves unknown ones in place', () => {
    expect(
      format('Tekst {number} z {count} {other}', { number: '01', count: 4 })
    ).toBe('Tekst 01 z 4 {other}');
  });

  it('pads single digits to two characters', () => {
    expect(padNumber(4)).toBe('04');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { AbsurdityScale, splitFootnotes } from '.';

const FOOTNOTES = '<div class="footnotes"><hr><ol><li>Note</li></ol></div>';

describe('splitFootnotes', () => {
  it('separates the trailing footnotes block from the body', () => {
    expect(splitFootnotes(`<p>Body</p>${FOOTNOTES}`)).toEqual({
      body: '<p>Body</p>',
      footnotes: FOOTNOTES,
    });
  });

  it('returns no footnotes for a text without any', () => {
    expect(splitFootnotes('<p>Body</p>')).toEqual({
      body: '<p>Body</p>',
      footnotes: null,
    });
  });
});

describe('AbsurdityScale', () => {
  const markerPosition = (value: number) => {
    const { getByText } = render(
      <AbsurdityScale
        value={value}
        lowLabel="low"
        highLabel="high"
        markerLabel="here"
      />
    );
    return getByText('↑ here').parentElement?.style.left;
  };

  // One value inside the range, one past the cap.
  it.each([
    [0.58, '58%'],
    [1.7, '100%'],
  ])('places the marker for scale %s at %s', (value, left) => {
    expect(markerPosition(value)).toBe(left);
  });
});

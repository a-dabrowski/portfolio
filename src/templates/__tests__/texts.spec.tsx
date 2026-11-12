import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextsIndex from '../texts';
import { TextSummaryNode } from '../../types';

const text = (slug: string, form: string): TextSummaryNode => ({
  id: slug,
  timeToRead: 2,
  fields: { slug },
  frontmatter: {
    title: `Title ${slug}`,
    year: '2026',
    form,
    dek: null,
    stamp: null,
    scale: 0.5,
  },
});

const renderIndex = () =>
  render(
    <TextsIndex
      {...({} as React.ComponentProps<typeof TextsIndex>)}
      data={{
        allMarkdownRemark: {
          nodes: [text('a', 'Bit'), text('b', 'Monolog'), text('c', 'Bit')],
        },
      }}
      pageContext={{ locale: 'pl' }}
    />
  );

const listedTitles = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll('a[href^="/texts/"]:not([href="/texts/"])')
  ).map((link) => link.getAttribute('href'));

describe('Texts index', () => {
  it('lists every text, newest first', () => {
    const { container } = renderIndex();
    expect(listedTitles(container)).toEqual([
      '/texts/a/',
      '/texts/b/',
      '/texts/c/',
    ]);
  });

  it('shows only the chosen form after a filter is pressed', () => {
    const { container, getByRole } = renderIndex();
    fireEvent.click(getByRole('button', { name: /^Bit/ }));
    expect(listedTitles(container)).toEqual(['/texts/a/', '/texts/c/']);
  });

  it('shows the number of texts on each filter', () => {
    const { getByRole } = renderIndex();
    expect(getByRole('button', { name: /^Bit/ })).toHaveTextContent('Bit2');
  });
});

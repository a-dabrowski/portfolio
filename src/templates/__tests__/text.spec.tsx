import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextTemplate from '../text';
import pl from '../../../content/i18n/pl.json';

const renderText = (lede: string | null) =>
  render(
    <TextTemplate
      {...({} as React.ComponentProps<typeof TextTemplate>)}
      data={{
        markdownRemark: {
          html:
            '<p>Long body.</p><blockquote><p>The quote.</p></blockquote>' +
            '<div class="footnotes"><ol><li>Footnote.</li></ol></div>',
          excerpt: 'Long body.',
          timeToRead: 3,
          frontmatter: {
            title: 'Title',
            year: '2026',
            form: 'Bit',
            stamp: null,
            scale: null,
            dateline: null,
            dek: null,
            lede,
          },
        },
      }}
      pageContext={{
        id: 'text',
        locale: 'pl',
        number: 1,
        count: 2,
        previousPath: '/texts/previous/',
        next: { path: '/texts/next/', title: 'Next', number: 2 },
      }}
    />
  );

describe('Text page', () => {
  it('shows the long form with footnotes by default', () => {
    const { getByText } = renderText('The lede.');
    expect(getByText('Footnote.')).toBeInTheDocument();
  });

  it('replaces the body with the lede and first quote in the short form', () => {
    const { getByText, container } = renderText('The lede.');
    fireEvent.click(getByText(pl.article.shortForm));
    expect(container.querySelector('article')).toHaveTextContent(
      /The lede\.The quote\./
    );
  });

  it('drops the footnotes in the short form', () => {
    const { getByText, queryByText } = renderText('The lede.');
    fireEvent.click(getByText(pl.article.shortForm));
    expect(queryByText('Footnote.')).not.toBeInTheDocument();
  });

  it('returns to the long form from the short form button', () => {
    window.scrollTo = jest.fn();
    const { getByText } = renderText('The lede.');
    fireEvent.click(getByText(pl.article.shortForm));
    fireEvent.click(getByText(/^Czytaj wersję długą · 3 min/));
    expect(getByText('Long body.')).toBeInTheDocument();
  });

  it('offers no length switch for a text without a lede', () => {
    const { queryByText } = renderText(null);
    expect(queryByText(pl.article.shortForm)).not.toBeInTheDocument();
  });
});

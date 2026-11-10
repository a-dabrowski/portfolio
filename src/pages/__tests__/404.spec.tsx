import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '../404';
import pl from '../../../content/i18n/pl.json';

describe('404 Page', () => {
  it('renders the heading', () => {
    const { getByRole } = render(<NotFoundPage />);
    expect(getByRole('heading', { level: 1 })).toHaveTextContent(
      pl.notFound.heading
    );
  });

  it('links back to the home page', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText(pl.notFound.action).closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders within the Layout (has header and footer)', () => {
    const { container } = render(<NotFoundPage />);
    expect(container.querySelectorAll('header, footer')).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

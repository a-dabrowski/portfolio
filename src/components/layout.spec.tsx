import React from 'react';
import { render } from '@testing-library/react';
import Layout from './layout';
import pl from '../../content/i18n/pl.json';

const renderLayout = () =>
  render(
    <Layout>
      <p>Page Content</p>
    </Layout>
  );

describe('Layout component', () => {
  it('renders children content', () => {
    const { getByText } = renderLayout();
    expect(getByText('Page Content')).toBeInTheDocument();
  });

  it('links the brand to the home page', () => {
    const { getByText } = renderLayout();
    expect(getByText(pl.site.brand).closest('a')).toHaveAttribute('href', '/');
  });

  it.each([
    [pl.nav.texts, '/#texts'],
    [pl.nav.contact, '/#contact'],
    [pl.nav.photography, '/photography/'],
  ])('links "%s" in the navigation to %s', (label, href) => {
    const { getByText } = renderLayout();
    expect(getByText(`→ ${label}`)).toHaveAttribute('href', href);
  });

  it('shows a language without content as inactive text, not a link', () => {
    const { getByText } = renderLayout();
    expect(getByText('en').tagName).toBe('SPAN');
  });

  it('renders footer with the current year', () => {
    const { container } = renderLayout();
    expect(container.querySelector('footer')).toHaveTextContent(
      `© ${new Date().getFullYear()} ${pl.site.copyright}`
    );
  });
});

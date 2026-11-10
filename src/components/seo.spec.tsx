import React from 'react';
import { render } from '@testing-library/react';
import SEO from './seo';
import { setupUseStaticQuery } from '../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

// SEO renders Gatsby Head API elements; Gatsby hoists them into <head> at
// build time, so in tests they are queried where React rendered them.
const metaContent = (container: HTMLElement, selector: string) =>
  container.querySelector(`meta[${selector}]`)?.getAttribute('content');

describe('SEO component', () => {
  it('sets the page title with the site title suffix', () => {
    const { container } = render(<SEO title="Test Page" />);
    expect(container.querySelector('title')).toHaveTextContent(
      'Test Page | Adam Dabrowski Studio'
    );
  });

  it('sets the meta description from props', () => {
    const { container } = render(
      <SEO title="Test" description="Custom description" />
    );
    expect(metaContent(container, 'name="description"')).toBe(
      'Custom description'
    );
  });

  it('falls back to site description when no description prop', () => {
    const { container } = render(<SEO title="Test" />);
    expect(metaContent(container, 'name="description"')).toBe(
      'Webpage to showcase work of Adam Dabrowski'
    );
  });

  it('sets the Open Graph title', () => {
    const { container } = render(<SEO title="OG Test" />);
    expect(metaContent(container, 'property="og:title"')).toBe('OG Test');
  });

  it('sets the Open Graph type', () => {
    const { container } = render(<SEO title="OG Test" />);
    expect(metaContent(container, 'property="og:type"')).toBe('website');
  });

  it('sets the Twitter card type', () => {
    const { container } = render(<SEO title="Twitter Test" />);
    expect(metaContent(container, 'name="twitter:card"')).toBe('summary');
  });

  it('sets the Twitter creator from site metadata', () => {
    const { container } = render(<SEO title="Twitter Test" />);
    expect(metaContent(container, 'name="twitter:creator"')).toBe(
      'Adam Dabrowski'
    );
  });

  it('sets html lang attribute', () => {
    const { container } = render(<SEO title="Test" lang="pl" />);
    expect(container.querySelector('html')).toHaveAttribute('lang', 'pl');
  });

  it('defaults lang to pl', () => {
    const { container } = render(<SEO title="Test" />);
    expect(container.querySelector('html')).toHaveAttribute('lang', 'pl');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import Helmet from 'react-helmet';
import { useStaticQuery } from 'gatsby';
import SEO from './seo';
import { setupUseStaticQuery } from '../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

describe('SEO component', () => {
  it('sets the page title', () => {
    render(<SEO title="Test Page" />);
    const helmet = Helmet.peek();
    expect(helmet.title).toContain('Test Page');
  });

  it('sets the meta description from props', () => {
    render(<SEO title="Test" description="Custom description" />);
    const helmet = Helmet.peek();
    const descMeta = helmet.metaTags.find(
      (m: { name?: string }) => m.name === 'description'
    );
    expect(descMeta.content).toBe('Custom description');
  });

  it('falls back to site description when no description prop', () => {
    render(<SEO title="Test" />);
    const helmet = Helmet.peek();
    const descMeta = helmet.metaTags.find(
      (m: { name?: string }) => m.name === 'description'
    );
    expect(descMeta.content).toBe(
      'Webpage to showcase work of Adam Dabrowski'
    );
  });

  it('sets Open Graph tags', () => {
    render(<SEO title="OG Test" />);
    const helmet = Helmet.peek();
    const ogTitle = helmet.metaTags.find(
      (m: { property?: string }) => m.property === 'og:title'
    );
    const ogType = helmet.metaTags.find(
      (m: { property?: string }) => m.property === 'og:type'
    );
    expect(ogTitle.content).toBe('OG Test');
    expect(ogType.content).toBe('website');
  });

  it('sets Twitter card tags', () => {
    render(<SEO title="Twitter Test" />);
    const helmet = Helmet.peek();
    const twitterCard = helmet.metaTags.find(
      (m: { name?: string }) => m.name === 'twitter:card'
    );
    const twitterCreator = helmet.metaTags.find(
      (m: { name?: string }) => m.name === 'twitter:creator'
    );
    expect(twitterCard.content).toBe('summary');
    expect(twitterCreator.content).toBe('Adam Dabrowski');
  });

  it('sets html lang attribute', () => {
    render(<SEO title="Test" lang="pl" />);
    const helmet = Helmet.peek();
    expect(helmet.htmlAttributes.lang).toBe('pl');
  });

  it('defaults lang to en', () => {
    render(<SEO title="Test" />);
    const helmet = Helmet.peek();
    expect(helmet.htmlAttributes.lang).toBe('en');
  });
});

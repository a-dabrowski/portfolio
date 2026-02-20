import React from 'react';
import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import BlogIndex from '../blog';
import {
  mockLocation,
  setupUseStaticQuery,
} from '../../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

const mockData = {
  site: { siteMetadata: { title: 'Adam Dabrowski Studio' } },
  allMarkdownRemark: {
    edges: [
      {
        node: {
          excerpt: 'First post excerpt...',
          fields: { slug: '/hello-world/' },
          frontmatter: {
            date: 'May 01, 2015',
            title: 'Hello World',
            description: 'My first blog post',
          },
        },
      },
      {
        node: {
          excerpt: 'Second post excerpt...',
          fields: { slug: '/new-beginnings/' },
          frontmatter: {
            date: 'May 28, 2015',
            title: 'New Beginnings',
            description: undefined,
          },
        },
      },
    ],
  },
};

describe('Blog Index Page', () => {
  const renderPage = () =>
    render(
      <BlogIndex
        data={mockData}
        location={mockLocation}
        pageContext={{}}
        path="/blog"
        uri="/blog"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );

  it('renders blog post titles', () => {
    const { getByText } = renderPage();
    expect(getByText('Hello World')).toBeInTheDocument();
    expect(getByText('New Beginnings')).toBeInTheDocument();
  });

  it('renders blog post titles as links', () => {
    const { getByText } = renderPage();
    const helloLink = getByText('Hello World').closest('a');
    expect(helloLink).toHaveAttribute('href', '/hello-world/');
    const newLink = getByText('New Beginnings').closest('a');
    expect(newLink).toHaveAttribute('href', '/new-beginnings/');
  });

  it('renders post dates', () => {
    const { getByText } = renderPage();
    expect(getByText('May 01, 2015')).toBeInTheDocument();
    expect(getByText('May 28, 2015')).toBeInTheDocument();
  });

  it('renders post description or excerpt', () => {
    const { container } = renderPage();
    // First post uses description
    expect(container).toHaveTextContent('My first blog post');
    // Second post falls back to excerpt
    expect(container).toHaveTextContent('Second post excerpt...');
  });

  it('renders within Layout with header and footer', () => {
    const { container } = renderPage();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = renderPage();
    expect(asFragment()).toMatchSnapshot();
  });
});

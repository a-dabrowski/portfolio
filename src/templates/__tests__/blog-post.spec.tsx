import React from 'react';
import { render } from '@testing-library/react';
import BlogPostTemplate from '../blog-post';
import {
  mockLocation,
  mockBlogPost,
  setupUseStaticQuery,
} from '../../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

const mockData = {
  site: { siteMetadata: { title: 'Adam Dabrowski Studio' } },
  markdownRemark: mockBlogPost,
};

const mockPageContext = {
  slug: '/hello-world/',
  previous: {
    fields: { slug: '/previous-post/' },
    frontmatter: { title: 'Previous Post' },
  },
  next: {
    fields: { slug: '/next-post/' },
    frontmatter: { title: 'Next Post' },
  },
};

describe('BlogPost Template', () => {
  const renderTemplate = (pageContext = mockPageContext) =>
    render(
      <BlogPostTemplate
        data={mockData}
        location={mockLocation}
        pageContext={pageContext}
        path="/hello-world/"
        uri="/hello-world/"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );

  it('renders the post title', () => {
    const { getByText } = renderTemplate();
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders the post date', () => {
    const { getByText } = renderTemplate();
    expect(getByText('May 01, 2015')).toBeInTheDocument();
  });

  it('renders the post HTML content', () => {
    const { container } = renderTemplate();
    expect(container).toHaveTextContent('Hello World content');
  });

  it('renders the Bio component in footer', () => {
    const { getAllByText } = renderTemplate();
    const matches = getAllByText(/Adam Dabrowski/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders previous post navigation link', () => {
    const { getByText } = renderTemplate();
    const prevLink = getByText(/Previous Post/);
    expect(prevLink.closest('a')).toHaveAttribute('href', '/previous-post/');
  });

  it('renders next post navigation link', () => {
    const { getByText } = renderTemplate();
    const nextLink = getByText(/Next Post/);
    expect(nextLink.closest('a')).toHaveAttribute('href', '/next-post/');
  });

  it('renders Home link', () => {
    const { getByText } = renderTemplate();
    const homeLink = getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders without previous/next when not provided', () => {
    const contextWithoutNav = {
      slug: '/hello-world/',
      previous: null,
      next: null,
    };
    const { queryByText } = renderTemplate(contextWithoutNav);
    expect(queryByText('Previous Post')).not.toBeInTheDocument();
    expect(queryByText('Next Post')).not.toBeInTheDocument();
  });

  it('renders within Layout with header and footer', () => {
    const { container } = renderTemplate();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = renderTemplate();
    expect(asFragment()).toMatchSnapshot();
  });
});

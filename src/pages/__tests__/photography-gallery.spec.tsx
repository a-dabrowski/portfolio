import React from 'react';
import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import BalkanPhotography from '../photography/balkan';
import {
  mockLocation,
  mockGalleryImages,
  setupUseStaticQuery,
} from '../../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

const mockData = {
  allFile: {
    edges: mockGalleryImages,
  },
};

describe('Photography Gallery Page (Balkan)', () => {
  const renderPage = () =>
    render(
      <BalkanPhotography
        data={mockData}
        location={mockLocation}
        pageContext={{}}
        path="/photography/balkan"
        uri="/photography/balkan"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );

  it('renders the gallery with images', () => {
    const { container } = renderPage();
    const images = container.querySelectorAll('.pswp-gallery img');
    expect(images).toHaveLength(2);
  });

  it('renders thumbnail images with correct sources', () => {
    const { container } = renderPage();
    const images = container.querySelectorAll('.pswp-gallery img');
    expect(images[0]).toHaveAttribute('src', '/static/test-thumb.webp');
    expect(images[1]).toHaveAttribute('src', '/static/test-thumb-2.webp');
  });

  it('renders the Back button', () => {
    const { getByText } = renderPage();
    expect(getByText('Back')).toBeInTheDocument();
  });

  it('Back button links to home page', () => {
    const { getByText } = renderPage();
    const backLink = getByText('Back').closest('a');
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('renders within Layout with header and footer', () => {
    const { container } = renderPage();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders the gallery container with correct ID', () => {
    const { container } = renderPage();
    const gallery = container.querySelector('#balkas');
    expect(gallery).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = renderPage();
    expect(asFragment()).toMatchSnapshot();
  });
});

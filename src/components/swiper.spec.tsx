import React from 'react';
import { render } from '@testing-library/react';
import SimpleGallery from './swiper';
import { mockGalleryImages } from '../../tests/test-utils';

describe('SimpleGallery component', () => {
  const defaultProps = {
    galleryID: 'test-gallery',
    images: mockGalleryImages,
  };

  it('renders the gallery container with correct ID', () => {
    const { container } = render(<SimpleGallery {...defaultProps} />);
    const gallery = container.querySelector('#test-gallery');
    expect(gallery).toBeInTheDocument();
  });

  it('renders correct number of image links', () => {
    const { container } = render(<SimpleGallery {...defaultProps} />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(2);
  });

  it('renders thumbnail images', () => {
    const { container } = render(<SimpleGallery {...defaultProps} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/static/test-thumb.webp');
    expect(images[1]).toHaveAttribute('src', '/static/test-thumb-2.webp');
  });

  it('links to full-size images', () => {
    const { container } = render(<SimpleGallery {...defaultProps} />);
    const links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('href', '/static/test-full.webp');
    expect(links[1]).toHaveAttribute('href', '/static/test-full-2.webp');
  });

  it('sets pswp width and height data attributes', () => {
    const { container } = render(<SimpleGallery {...defaultProps} />);
    const links = container.querySelectorAll('a');
    expect(links[0]).toHaveAttribute('data-pswp-width', '2000');
    expect(links[0]).toHaveAttribute('data-pswp-height', '1333');
  });

  it('renders with pswp-gallery class', () => {
    const { container } = render(<SimpleGallery {...defaultProps} />);
    const gallery = container.querySelector('.pswp-gallery');
    expect(gallery).toBeInTheDocument();
  });

  it('renders with empty images array', () => {
    const { container } = render(
      <SimpleGallery galleryID="empty-gallery" images={[]} />
    );
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(0);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SimpleGallery {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

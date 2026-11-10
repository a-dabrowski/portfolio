import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import ImageButton from './ImageButton';

describe('ImageButton component', () => {
  const defaultProps = {
    image: {
      layout: 'constrained',
      width: 384,
      height: 384,
      images: { fallback: { src: '/test-image.webp' } },
    } as IGatsbyImageData,
    children: 'View Gallery',
  };

  it('renders children text', () => {
    const { getByText } = render(<ImageButton {...defaultProps} />);
    expect(getByText('View Gallery')).toBeInTheDocument();
  });

  it('renders the tile as an image element', () => {
    const { getByTestId } = render(<ImageButton {...defaultProps} />);
    expect(getByTestId('gatsby-image')).toBeInTheDocument();
  });

  it('passes the loading strategy to the image', () => {
    const { getByTestId } = render(
      <ImageButton {...defaultProps} loading="eager" />
    );
    expect(getByTestId('gatsby-image')).toHaveAttribute('loading', 'eager');
  });

  it('calls handleClick when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <ImageButton {...defaultProps} handleClick={handleClick} />
    );
    const button = container.querySelector('button')!;
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders without handleClick prop', () => {
    const { container } = render(<ImageButton {...defaultProps} />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ImageButton {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

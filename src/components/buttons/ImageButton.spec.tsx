import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ImageButton from './ImageButton';

describe('ImageButton component', () => {
  const defaultProps = {
    image: '/test-image.jpg',
    children: 'View Gallery',
  };

  it('renders children text', () => {
    const { getByText } = render(<ImageButton {...defaultProps} />);
    expect(getByText('View Gallery')).toBeInTheDocument();
  });

  it('sets background image style', () => {
    const { container } = render(<ImageButton {...defaultProps} />);
    const button = container.querySelector('button');
    expect(button).toHaveStyle({
      backgroundImage: 'url("/test-image.jpg")',
    });
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

import React from 'react';
import { render } from '@testing-library/react';
import Testimonial from './Testimonial';

describe('Testimonial component', () => {
  const defaultProps = {
    title: 'John Doe',
    image: '/images/john.jpg',
    opinion: 'Great work and amazing results!',
  };

  it('renders the title', () => {
    const { getByText } = render(<Testimonial {...defaultProps} />);
    expect(getByText(/John Doe/)).toBeInTheDocument();
  });

  it('renders the opinion text', () => {
    const { getByText } = render(<Testimonial {...defaultProps} />);
    expect(
      getByText('Great work and amazing results!')
    ).toBeInTheDocument();
  });

  it('renders the image with correct src', () => {
    const { container } = render(<Testimonial {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/images/john.jpg');
    expect(img).toHaveAttribute('alt', 'Person');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Testimonial {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import FoldingDoor from './FoldingDoor';

describe('FoldingDoor component', () => {
  const defaultProps = {
    title: 'Gallery Title',
    description: 'A beautiful gallery',
    image: '/images/gallery.jpg',
  };

  it('renders the title', () => {
    const { getByText } = render(<FoldingDoor {...defaultProps} />);
    expect(getByText('Gallery Title')).toBeInTheDocument();
  });

  it('renders the description', () => {
    const { getByText } = render(<FoldingDoor {...defaultProps} />);
    expect(getByText('A beautiful gallery')).toBeInTheDocument();
  });

  it('sets background image style', () => {
    const { container } = render(<FoldingDoor {...defaultProps} />);
    const div = container.querySelector('.folding-door');
    expect(div).toHaveStyle({
      backgroundImage: 'url(/images/gallery.jpg)',
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<FoldingDoor {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

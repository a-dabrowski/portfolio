import React from 'react';
import { render } from '@testing-library/react';
import { Contact } from './contact';

describe('Contact component', () => {
  it('renders Instagram link', () => {
    const { getByText } = render(<Contact />);
    const link = getByText('Instagram').closest('a');
    expect(link).toHaveAttribute(
      'href',
      'https://www.instagram.com/adam_dabrowski/'
    );
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders email link', () => {
    const { getByText } = render(<Contact />);
    const link = getByText('adam.dabrowski@outlook.com').closest('a');
    expect(link).toHaveAttribute(
      'href',
      'mailto:adam.dabrowski@outlook.com'
    );
  });

  it('renders GitHub link', () => {
    const { getByText } = render(<Contact />);
    const link = getByText('GitHub').closest('a');
    expect(link).toHaveAttribute('href', 'https://github.com/a-dabrowski');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders contact heading', () => {
    const { getByText } = render(<Contact />);
    expect(getByText('Kontakt')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Contact />);
    expect(asFragment()).toMatchSnapshot();
  });
});

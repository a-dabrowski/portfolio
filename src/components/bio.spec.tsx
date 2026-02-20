import React from 'react';
import { render } from '@testing-library/react';
import Bio from './bio';
import { setupUseStaticQuery } from '../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

describe('Bio component', () => {
  it('renders the author name', () => {
    const { getByText } = render(<Bio />);
    expect(getByText(/Adam Dabrowski/)).toBeInTheDocument();
  });

  it('renders "lives and works in Warsaw" text', () => {
    const { getByText } = render(<Bio />);
    expect(getByText(/Warsaw/)).toBeInTheDocument();
  });

  it('renders Twitter link', () => {
    const { getByText } = render(<Bio />);
    const link = getByText('Twitter');
    expect(link).toHaveAttribute(
      'href',
      'https://twitter.com/Dabrowski_AD'
    );
  });

  it('renders Instagram link', () => {
    const { getByText } = render(<Bio />);
    const link = getByText('Instagram');
    expect(link).toHaveAttribute(
      'href',
      'https://twitter.com/adam_dabrowski'
    );
  });

  it('renders the avatar image', () => {
    const { getByTestId } = render(<Bio />);
    expect(getByTestId('gatsby-image')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Bio />);
    expect(asFragment()).toMatchSnapshot();
  });
});

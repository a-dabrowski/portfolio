import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders children text', () => {
    const { getByText } = render(<Header>My Header</Header>);
    expect(getByText('My Header')).toBeInTheDocument();
  });

  it('renders as an h3 element', () => {
    const { container } = render(<Header>Title</Header>);
    const h3 = container.querySelector('h3');
    expect(h3).toBeInTheDocument();
    expect(h3).toHaveTextContent('Title');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Header>Section Header</Header>);
    expect(asFragment()).toMatchSnapshot();
  });
});

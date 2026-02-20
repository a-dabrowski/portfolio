import React from 'react';
import { render } from '@testing-library/react';
import Cta from './Cta';

describe('Cta component', () => {
  it('renders children text', () => {
    const { getByText } = render(<Cta>Click me</Cta>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    const { container } = render(<Cta>Action</Cta>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Cta>Call to Action</Cta>);
    expect(asFragment()).toMatchSnapshot();
  });
});

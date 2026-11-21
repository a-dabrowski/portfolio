import React from 'react';
import { render } from '@testing-library/react';
import Styleguide from '../styleguide';

describe('Styleguide page', () => {
  it('tags an example with the code that produces it', () => {
    const { getByText } = render(<Styleguide />);
    expect(getByText('<Display size="hero">')).toBeInTheDocument();
  });
});

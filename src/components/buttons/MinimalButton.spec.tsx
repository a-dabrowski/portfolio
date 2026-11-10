import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MinimalButton from './MinimalButton';

describe('MinimalButton component', () => {
  it('renders properly', () => {
    const { container, getByText, asFragment } = render(
      <MinimalButton>Button test</MinimalButton>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('show the same text as declared', () => {
    const { getByText } = render(<MinimalButton>Button test</MinimalButton>);
    expect(getByText('Button test')).toBeInTheDocument();
  });
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <MinimalButton onClick={handleClick}>Click</MinimalButton>
    );
    fireEvent.click(getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('defaults to type="button" so it does not submit a surrounding form', () => {
    const { getByText } = render(<MinimalButton>Plain</MinimalButton>);
    expect(getByText('Plain')).toHaveAttribute('type', 'button');
  });
});

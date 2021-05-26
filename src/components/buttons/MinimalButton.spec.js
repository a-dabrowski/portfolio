import React from 'react';
import { render } from '@testing-library/react';

import MinimalButton from './MinimalButton';

describe('MinimalButton component', () => {
  it('renders properly', () => {
    const { container, getByText, asFragment } = render(
      <MinimalButton>Button test</MinimalButton>
    );
    expect(
      asFragment(<MinimalButton>Button Test</MinimalButton>)
    ).toMatchSnapshot();
  });
  it('show the same text as declared', () => {
    const { getByText } = render(<MinimalButton>Button test</MinimalButton>);
    expect(getByText('Button test')).toBeInTheDocument();
  });
});

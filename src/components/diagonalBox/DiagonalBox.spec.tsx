import React from 'react';
import { render } from '@testing-library/react';
import DiagonalBox from './index';

describe('DiagonalBox component', () => {
  it('renders children', () => {
    const { getByText } = render(
      <DiagonalBox>
        <p>Content inside</p>
      </DiagonalBox>
    );
    expect(getByText('Content inside')).toBeInTheDocument();
  });

  it('applies skew class when skewContent is true', () => {
    const { container } = render(
      <DiagonalBox skewContent>
        <p>Skewed content</p>
      </DiagonalBox>
    );
    const contentDiv = container.querySelector(
      '.diagonal-container__content--skew'
    );
    expect(contentDiv).toBeInTheDocument();
  });

  it('does not apply skew class when skewContent is false', () => {
    const { container } = render(
      <DiagonalBox>
        <p>Normal content</p>
      </DiagonalBox>
    );
    const contentDiv = container.querySelector(
      '.diagonal-container__content--skew'
    );
    expect(contentDiv).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <DiagonalBox skewContent>
        <p>Test</p>
      </DiagonalBox>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

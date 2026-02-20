import React from 'react';
import { render } from '@testing-library/react';
import CenterSlider from './slider';

// Mock react-slick since it relies on browser APIs
jest.mock('react-slick', () => {
  return function MockSlider({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-slider">{children}</div>;
  };
});

describe('CenterSlider component', () => {
  it('renders children', () => {
    const { getByText } = render(
      <CenterSlider>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </CenterSlider>
    );
    expect(getByText('Slide 1')).toBeInTheDocument();
    expect(getByText('Slide 2')).toBeInTheDocument();
  });

  it('renders within a slider wrapper', () => {
    const { getByTestId } = render(
      <CenterSlider>
        <div>Content</div>
      </CenterSlider>
    );
    expect(getByTestId('mock-slider')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <CenterSlider>
        <div>Slide A</div>
        <div>Slide B</div>
        <div>Slide C</div>
      </CenterSlider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

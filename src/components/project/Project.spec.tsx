import React from 'react';
import { render } from '@testing-library/react';
import Project from './Project';
import { mockProjectData } from '../../../tests/test-utils';

describe('Project component', () => {
  it('renders project name', () => {
    const { getByText } = render(<Project data={mockProjectData} />);
    expect(getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    const { getByText } = render(<Project data={mockProjectData} />);
    expect(getByText('A test project description')).toBeInTheDocument();
  });

  it('renders demo link with correct href', () => {
    const { getByText } = render(<Project data={mockProjectData} />);
    const demoLink = getByText('Demo').closest('a');
    expect(demoLink).toHaveAttribute('href', 'https://example.com/demo');
    expect(demoLink).toHaveAttribute('target', '_blank');
  });

  it('renders code link with correct href', () => {
    const { getByText } = render(<Project data={mockProjectData} />);
    const codeLink = getByText('Code').closest('a');
    expect(codeLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(codeLink).toHaveAttribute('target', '_blank');
  });

  it('renders project image', () => {
    const { container } = render(<Project data={mockProjectData} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/screenshots/test.png');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Project data={mockProjectData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

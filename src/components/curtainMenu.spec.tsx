import React from 'react';
import { render } from '@testing-library/react';
import { Menu, MenuContainer, MenuItem } from './curtainMenu';

describe('Menu component', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Menu open={true} transition="top">
        <span>Menu Content</span>
      </Menu>
    );
    expect(getByText('Menu Content')).toBeInTheDocument();
  });

  it('applies open styles for top transition', () => {
    const { container } = render(
      <Menu open={true} transition="top">
        <span>Open</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu.className).toContain('h-full');
    expect(menu.className).toContain('w-full');
  });

  it('applies closed styles for top transition', () => {
    const { container } = render(
      <Menu open={false} transition="top">
        <span>Closed</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu.className).toContain('h-0');
  });

  it('applies open styles for left transition', () => {
    const { container } = render(
      <Menu open={true} transition="left">
        <span>Open Left</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu.className).toContain('w-full');
  });

  it('applies closed styles for left transition', () => {
    const { container } = render(
      <Menu open={false} transition="left">
        <span>Closed Left</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu.className).toContain('w-0');
  });
});

describe('MenuContainer component', () => {
  it('renders children', () => {
    const { getByText } = render(
      <MenuContainer>
        <span>Container Content</span>
      </MenuContainer>
    );
    expect(getByText('Container Content')).toBeInTheDocument();
  });
});

describe('MenuItem component', () => {
  it('renders children text', () => {
    const { getByText } = render(
      <MenuItem href="/test">Test Item</MenuItem>
    );
    expect(getByText('Test Item')).toBeInTheDocument();
  });

  it('renders a link with correct href', () => {
    const { getByText } = render(
      <MenuItem href="/photography">Gallery</MenuItem>
    );
    const link = getByText('Gallery');
    expect(link).toHaveAttribute('href', '/photography');
  });
});

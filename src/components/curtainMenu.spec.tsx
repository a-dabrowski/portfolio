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

  it('slides into view when open with top transition', () => {
    const { container } = render(
      <Menu open={true} transition="top">
        <span>Open</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu).toHaveClass('translate-y-0');
  });

  it('slides above the viewport when closed with top transition', () => {
    const { container } = render(
      <Menu open={false} transition="top">
        <span>Closed</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu).toHaveClass('-translate-y-full');
  });

  it('slides into view when open with left transition', () => {
    const { container } = render(
      <Menu open={true} transition="left">
        <span>Open Left</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu).toHaveClass('translate-x-0');
  });

  it('slides off the left edge when closed with left transition', () => {
    const { container } = render(
      <Menu open={false} transition="left">
        <span>Closed Left</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu).toHaveClass('-translate-x-full');
  });

  it('is invisible when closed so its links leave the tab order', () => {
    const { container } = render(
      <Menu open={false} transition="top">
        <span>Closed</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu).toHaveClass('invisible');
  });

  it('animates transform rather than size', () => {
    const { container } = render(
      <Menu open={true} transition="top">
        <span>Open</span>
      </Menu>
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu).toHaveClass('transition-[transform,visibility]');
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

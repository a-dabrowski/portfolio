import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Layout from './layout';
import { mockLocation } from '../../tests/test-utils';

describe('Layout component', () => {
  const defaultProps = {
    location: mockLocation,
    title: 'Test Site',
  };

  it('renders children content', () => {
    const { getByText } = render(
      <Layout {...defaultProps}>
        <p>Page Content</p>
      </Layout>
    );
    expect(getByText('Page Content')).toBeInTheDocument();
  });

  it('renders the site title link', () => {
    const { getByText } = render(
      <Layout {...defaultProps}>
        <p>Content</p>
      </Layout>
    );
    expect(getByText('Dabrowski Studio')).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    const { container } = render(
      <Layout {...defaultProps}>
        <p>Content</p>
      </Layout>
    );
    const footer = container.querySelector('footer');
    expect(footer).toHaveTextContent('Adam Dabrowski');
    expect(footer).toHaveTextContent(new Date().getFullYear().toString());
  });

  it('renders the Menu button', () => {
    const { getByText } = render(
      <Layout {...defaultProps}>
        <p>Content</p>
      </Layout>
    );
    expect(getByText('Menu')).toBeInTheDocument();
  });

  it('opens the menu when Menu button is clicked', () => {
    const { getByText, container } = render(
      <Layout {...defaultProps}>
        <p>Content</p>
      </Layout>
    );
    fireEvent.click(getByText('Menu'));
    // After clicking, menu items should be visible
    expect(getByText('Homepage')).toBeInTheDocument();
    expect(getByText('Photography Services')).toBeInTheDocument();
    expect(getByText('Photography Portfolio')).toBeInTheDocument();
  });

  it('renders the home link pointing to /', () => {
    const { container } = render(
      <Layout {...defaultProps}>
        <p>Content</p>
      </Layout>
    );
    const homeLink = container.querySelector('a[href="/"]');
    expect(homeLink).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Layout {...defaultProps}>
        <p>Snapshot Content</p>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

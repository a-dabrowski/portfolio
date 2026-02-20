import React from 'react';
import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import DevelopmentPage from '../development';
import {
  mockLocation,
  setupUseStaticQuery,
} from '../../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

describe('Development Page', () => {
  const renderPage = () =>
    render(
      <DevelopmentPage
        data={{}}
        location={mockLocation}
        pageContext={{}}
        path="/development"
        uri="/development"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );

  it('renders the about section heading', () => {
    const { getByText } = renderPage();
    expect(
      getByText('Hello, my name is Adam Dabrowski')
    ).toBeInTheDocument();
  });

  it('renders the projects section', () => {
    const { getByText } = renderPage();
    expect(
      getByText("Here are some of the projects I've finished so far")
    ).toBeInTheDocument();
  });

  it('renders the technologies section', () => {
    const { getByText } = renderPage();
    expect(
      getByText("Technologies I've worked with")
    ).toBeInTheDocument();
  });

  it('renders project cards from JSON data', () => {
    const { getByText } = renderPage();
    // Check for at least one known project from projects.json
    expect(getByText('Random Quote Generator')).toBeInTheDocument();
  });

  it('renders technology items from JSON data', () => {
    const { getByText } = renderPage();
    // Check for at least one known technology from stack.json
    expect(getByText('HTML5')).toBeInTheDocument();
  });

  it('renders within Layout with header and footer', () => {
    const { container } = renderPage();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders the author image', () => {
    const { container } = renderPage();
    const img = container.querySelector('img.header__image');
    expect(img).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = renderPage();
    expect(asFragment()).toMatchSnapshot();
  });
});

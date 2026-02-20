import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '../404';
import { mockLocation, setupUseStaticQuery } from '../../../tests/test-utils';

beforeEach(() => {
  setupUseStaticQuery();
});

const mockData = {
  site: { siteMetadata: { title: 'Adam Dabrowski Studio' } },
};

describe('404 Page', () => {
  it('renders the "Not Found" heading', () => {
    const { getByText } = render(
      <NotFoundPage
        data={mockData}
        location={mockLocation}
        pageContext={{}}
        path="/404"
        uri="/404"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );
    expect(getByText('Not Found')).toBeInTheDocument();
  });

  it('renders the sadness message', () => {
    const { getByText } = render(
      <NotFoundPage
        data={mockData}
        location={mockLocation}
        pageContext={{}}
        path="/404"
        uri="/404"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );
    expect(
      getByText(/You just hit a route that doesn't exist/)
    ).toBeInTheDocument();
  });

  it('renders within the Layout (has header and footer)', () => {
    const { container } = render(
      <NotFoundPage
        data={mockData}
        location={mockLocation}
        pageContext={{}}
        path="/404"
        uri="/404"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <NotFoundPage
        data={mockData}
        location={mockLocation}
        pageContext={{}}
        path="/404"
        uri="/404"
        params={{}}
        pageResources={{} as any}
        serverData={{}}
        children={undefined}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

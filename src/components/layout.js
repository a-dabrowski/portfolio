import React from 'react';
import { Link } from 'gatsby';

import Header from './header';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isMainPage = window.location.pathname === '/';

  return (
    <div className="max-w-screen-lg m-a py-0 px-5 mt-2">
      <header>
        <div className="flex flex-row justify-between">
          {isMainPage ? (
            <h3 className="m-0 inline mr-3">Adam Dąbrowski</h3>
          ) : (
            <Link
              to="/"
              className="no-underline hover:underline"
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
            >
              <h3 className="m-0 inline mr-3">Adam Dąbrowski</h3>
            </Link>
          )}

          <div className="flex flex-col sm:flex-row">
            <Link
              className="no-underline hover:underline mr-3 mb-3 uppercase"
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
              to={`/photography/offer`}
            >
              Oferta
            </Link>
            <Link
              className="no-underline hover:underline mr-3 mb-3 uppercase"
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              Portfolio zdjęć
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-4">
        © {new Date().getFullYear()} - Built with ☕ by Adam Dąbrowski
      </footer>
    </div>
  );
};

export default Layout;

import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import Header from './header';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const [isMainPage, setIsMainPage] = useState(false);

  useEffect(() => {
    setIsMainPage(window.location.pathname === '/');
  });

  return (
    <div>
      <header className="p-4">
        <div className="flex flex-row justify-between items-center">
          {isMainPage ? (
            <h3 className="m-auto flex-grow mr-3">Adam Dąbrowski Fotografia</h3>
          ) : (
            <Link
              to="/"
              className="no-underline hover:underline"
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
            >
              <h3 className="m-auto inline mr-3">Adam Dąbrowski Fotografia</h3>
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
      <main className="max-w-screen-lg m-auto py-0 px-5">{children}</main>
      <footer className="text-center p-4">
        © {new Date().getFullYear()} - Built with ☕ by Adam Dąbrowski
      </footer>
    </div>
  );
};

export default Layout;

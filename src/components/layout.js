import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import { Menu, MenuContainer, MenuItem } from './curtainMenu';
import Header from './header';
import CloseIcon from '../assets/svg/xmark-solid.svg';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Menu open={isMenuOpen} transition="top">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          <CloseIcon className="fill-current" width="24"/>
        </button>
        <MenuContainer>
          <MenuItem href="/">Strona Główna</MenuItem>
          <MenuItem href="/photography/offer">Oferta</MenuItem>
          <MenuItem href="/photography">Portfolio</MenuItem>
          <MenuItem href="/">O Mnie</MenuItem>
        </MenuContainer>
      </Menu>
      <header className="p-4 border-b">
        <div className="flex flex-row justify-between items-center">
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
          <div className="flex flex-col sm:flex-row">
            <button className="uppercase" onClick={() => setMenuOpen(true)}>
              Menu
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-screen-lg m-auto py-0 px-5">{children}</main>
      <footer className="text-center p-4">
        © {new Date().getFullYear()} - Built with ☕ by Adam Dąbrowski
      </footer>
    </>
  );
};

export default Layout;

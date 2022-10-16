import React from 'react';
import { Link } from 'gatsby';
import { MinimalButton } from './buttons';
import { Contact } from './contact';

export const MainMenu = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-center">Adam Dąbrowski</h2>
      <Link className="m-auto mt-4 text-center" to="/">
        <MinimalButton isFixedWidth>Photography</MinimalButton>
      </Link>
      <Link className="m-auto mt-4 text-center" to="/development">
        <MinimalButton isFixedWidth>Development</MinimalButton>
      </Link>
      <Link className="m-auto mt-4 text-center" to="/recommended">
        <MinimalButton isFixedWidth>Recommended materials</MinimalButton>
      </Link>
      <Link className="m-auto mt-4 text-center" to="/blog">
        <MinimalButton isFixedWidth>Blog</MinimalButton>
      </Link>
      <Contact />
    </div>
  );
};
export default MainMenu;

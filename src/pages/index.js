import React from 'react';
import { Link } from 'gatsby';
import { MinimalButton } from '../components/buttons';
import { Contact } from '../components/contact';

const MainPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-center">Adam Dąbrowski</h1>
      <Link className="m-auto mt-8 text-center" to="/photography">
        <MinimalButton isFixedWidth>Fotografia</MinimalButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/development">
        <MinimalButton isFixedWidth>Development</MinimalButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/recommended">
        <MinimalButton isFixedWidth>Polecane materiały</MinimalButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/blog">
        <MinimalButton isFixedWidth>Blog</MinimalButton>
      </Link>
      <Contact />
    </div>
  );
};
export default MainPage;

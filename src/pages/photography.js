import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import Gallery from '../components/gallery';
import SEO from '../components/seo';
import { MinimalButton } from '../components/buttons';

const PhotographyIndex = ({ location }) => {
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div className="flex flex-col">
        <h2>Galerie zdjęć</h2>
          <Contact />
        <Link className="m-auto mt-8 text-center" to="/photography/milenia_ania">
          <MinimalButton>Milena i Ania</MinimalButton>
        </Link>
        <Link className="m-auto mt-8 text-center" to="/photography/paulina">
          <MinimalButton>Paulina</MinimalButton>
        </Link>
        <Link className="m-auto mt-8 text-center" to="/photography/studio">
          <MinimalButton>Zdjęcia w studio</MinimalButton>
        </Link>
        <Link className="m-auto mt-8 text-center" to="/photography/offer">
          <MinimalButton>Oferta</MinimalButton>
        </Link>
      </div>
    </Layout>
  );
};
export default PhotographyIndex;

import React from 'react';
import { Link } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { MinimalButton } from '../../components/buttons';

const OfferPhotography = ({ data, location }) => {
  return (
    <Layout location={location} title="Oferta fotograficzna">
      <SEO title="Photography offer" />
      <div>
        <h3>Oferta fotograficzna</h3>
        <h4>Sesja biznesowa</h4>
        <h4>Sesja portretowa</h4>
        <Link className="m-auto mt-8 text-center" to="/photography/contact">
          <MinimalButton>Kontakt</MinimalButton>
        </Link>
      </div>
    </Layout>
  );
};

export default OfferPhotography;

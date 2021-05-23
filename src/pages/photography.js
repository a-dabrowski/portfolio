import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import Gallery from '../components/gallery';
import SEO from '../components/seo';
import { ImageButton, MinimalButton } from '../components/buttons';

const PhotographyIndex = ({ data, location }) => (
  <Layout location={location} title="Fotografia">
    <SEO title="Photography section" />
    <div className="flex flex-row flex-wrap">
      <Link className="m-auto mt-8 text-center" to="/photography/milena_ania">
        <ImageButton image={data.milena.publicURL}>Milena Ania</ImageButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/photography/paulina">
        <ImageButton image={data.paulina.publicURL}>Paulina</ImageButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/photography/studio">
        <ImageButton image={data.studioFriends.publicURL}>
          F.R.I.E.N.D.S
        </ImageButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/photography/balkan">
        <ImageButton image={data.balkan.publicURL}>
          Bałkany
        </ImageButton>
      </Link>
    </div>
    <div className="flex flex-col">
      <Link className="m-auto mt-8 text-center" to="/photography/offer">
        <MinimalButton>Zapisy na sesję</MinimalButton>
      </Link>
    </div>
    <Contact />
  </Layout>
);

export default PhotographyIndex;

export const PhotoAllQuery = graphql`
  query StartPageQuery {
    paulina: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "paulina" }
    ) {
      publicURL
    }
    balkan: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "balkan" }
    ) {
      publicURL
    }
    studioFriends: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "studio_friends" }
    ) {
      publicURL
    }
    milena: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "milena_ania" }
    ) {
      publicURL
    }
  }
`;

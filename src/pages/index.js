import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import Gallery from '../components/gallery';
import SEO from '../components/seo';
import { ImageButton, MinimalButton } from '../components/buttons';

const PhotographyIndex = ({ data, location }) => (
  <Layout location={location} title="Photography">
    <SEO title="Adam Dabrowski | Photography" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <Link
        className="m-auto mt-8 text-center"
        to="/photography/zamoyskich_nadia"
      >
        <ImageButton image={data.zamoyskichNadia.publicURL}>
          Nadia - Zamoyskich Palace
        </ImageButton>
      </Link>
      <Link
        className="m-auto mt-8 text-center"
        to="/photography/zamoyskich_klaudia"
      >
        <ImageButton image={data.zamoyskichKlaudia.publicURL}>
          Klaudia - Zamoyskich Palace
        </ImageButton>
      </Link>
      <Link
        className="m-auto mt-8 text-center"
        to="/photography/fort_bema_agata"
      >
        <ImageButton image={data.bemaAnna.publicURL}>
          Anna - Fort Bema
        </ImageButton>
      </Link>
      <Link
        className="m-auto mt-8 text-center"
        to="/photography/fort_bema_agata"
      >
        <ImageButton image={data.bemaAgata.publicURL}>
          Agata - Fort Bema
        </ImageButton>
      </Link>
      <Link
        className="m-auto mt-8 text-center"
        to="/photography/fort_bema_wiktoria"
      >
        <ImageButton image={data.bemaWiktoria.publicURL}>
          Wiktoria - Fort Bema
        </ImageButton>
      </Link>
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
        <ImageButton image={data.balkan.publicURL}>Balkans</ImageButton>
      </Link>
      <Link className="m-auto mt-8 text-center" to="/photography/milena_neon">
        <ImageButton image={data.milenaNeon.publicURL}>Milena</ImageButton>
      </Link>
    </div>
    <div className="flex flex-col">
      <Link className="m-auto mt-8 text-center" to="/photography/offer">
        <MinimalButton>Sign up for your session</MinimalButton>
      </Link>
    </div>
    <Contact />
  </Layout>
);

export default PhotographyIndex;

export const PhotoAllQuery = graphql`
  query StartPageQuery {
    zamoyskichNadia: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "zamoyskich_nadia" }
    ) {
      publicURL
    }
    zamoyskichKlaudia: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "zamoyskich_klaudia" }
    ) {
      publicURL
    }
    bemaAnna: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "fort_bema_anna" }
    ) {
      publicURL
    }
    bemaAgata: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "fort_bema_agata" }
    ) {
      publicURL
    }
    bemaWiktoria: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "fort_bema_wiktoria" }
    ) {
      publicURL
    }
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
    milenaNeon: file(
      extension: { eq: "jpg" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "milena_neon" }
    ) {
      publicURL
    }
  }
`;

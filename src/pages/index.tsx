import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';

import Layout from '../components/layout';
import Contact from '../components/contact';
import SEO from '../components/seo';
import { ImageButton, MinimalButton } from '../components/buttons';
import { ImageFileNode } from '../types';

interface StartPageData {
  zamoyskichNadia: ImageFileNode;
  zamoyskichKlaudia: ImageFileNode;
  bemaAnna: ImageFileNode;
  bemaWiktoria: ImageFileNode;
  paulina: ImageFileNode;
  balkan: ImageFileNode;
  studioFriends: ImageFileNode;
  milena: ImageFileNode;
  milenaNeon: ImageFileNode;
}

const galleries: Array<{
  imageKey: keyof StartPageData;
  to: string;
  label: string;
}> = [
  {
    imageKey: 'zamoyskichNadia',
    to: '/photography/zamoyskich_nadia',
    label: 'Nadia - Zamoyskich Palace',
  },
  {
    imageKey: 'zamoyskichKlaudia',
    to: '/photography/zamoyskich_klaudia',
    label: 'Klaudia - Zamoyskich Palace',
  },
  {
    imageKey: 'bemaAnna',
    to: '/photography/fort_bema_anna',
    label: 'Anna - Fort Bema',
  },
  {
    imageKey: 'bemaWiktoria',
    to: '/photography/fort_bema_wiktoria',
    label: 'Wiktoria - Fort Bema',
  },
  { imageKey: 'milena', to: '/photography/milena_ania', label: 'Milena Ania' },
  { imageKey: 'paulina', to: '/photography/paulina', label: 'Paulina' },
  {
    imageKey: 'studioFriends',
    to: '/photography/studio',
    label: 'F.R.I.E.N.D.S',
  },
  { imageKey: 'balkan', to: '/photography/balkan', label: 'Balkans' },
  { imageKey: 'milenaNeon', to: '/photography/milena_neon', label: 'Milena' },
];

// One row of the sm:grid-cols-2 grid is visible without scrolling; those tiles
// load eagerly as LCP candidates, the rest lazily.
const EAGER_TILE_COUNT = 2;

const PhotographyIndex = ({ data, location }: PageProps<StartPageData>) => (
  <Layout location={location} title="Photography">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {galleries.map((gallery, index) => (
        <Link
          key={gallery.to}
          className="m-auto mt-8 text-center"
          to={gallery.to}
        >
          <ImageButton
            image={data[gallery.imageKey].childImageSharp.gatsbyImageData}
            loading={index < EAGER_TILE_COUNT ? 'eager' : 'lazy'}
          >
            {gallery.label}
          </ImageButton>
        </Link>
      ))}
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

export const Head = () => <SEO title="Adam Dabrowski | Photography" />;

// Tiles render at 192x128 below the sm breakpoint (640px) and 384x384 above
// it (ImageButton h-32 w-48 / sm:h-96 sm:w-96). The 384px square plus the
// default pixel densities gives a 96/192/384/768w srcset; q75 at 768px
// measured 187 KB for all nine tiles vs 2.7 MB for the original files.
export const PhotoAllQuery = graphql`
  fragment HomeTile on File {
    childImageSharp {
      gatsbyImageData(
        width: 384
        height: 384
        quality: 75
        layout: CONSTRAINED
        sizes: "(min-width: 640px) 384px, 192px"
      )
    }
  }

  query StartPageQuery {
    zamoyskichNadia: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "zamoyskich_nadia" }
    ) {
      ...HomeTile
    }
    zamoyskichKlaudia: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "zamoyskich_klaudia" }
    ) {
      ...HomeTile
    }
    bemaAnna: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "fort_bema_anna" }
    ) {
      ...HomeTile
    }
    bemaWiktoria: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "fort_bema_wiktoria" }
    ) {
      ...HomeTile
    }
    paulina: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "paulina" }
    ) {
      ...HomeTile
    }
    balkan: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "balkan" }
    ) {
      ...HomeTile
    }
    studioFriends: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "studio_friends" }
    ) {
      ...HomeTile
    }
    milena: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "milena_ania" }
    ) {
      ...HomeTile
    }
    milenaNeon: file(
      extension: { eq: "webp" }
      sourceInstanceName: { eq: "photography" }
      relativeDirectory: { eq: "milena_neon" }
    ) {
      ...HomeTile
    }
  }
`;

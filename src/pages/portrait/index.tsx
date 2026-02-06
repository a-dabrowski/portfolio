import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import SimpleGallery from '../../components/swiper';
import { GalleryPageData } from '../../types';

const PortraitIndex = ({ data, location }: PageProps<GalleryPageData>) => (
  <Layout location={location} title="Portraits">
    <SEO title="Adam Dabrowski | Portrait Photography" />
    <h2>PORTRAIT PHOTOGRAPHY</h2>
    <SimpleGallery galleryID="portrait" images={data.allFile.edges} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
  </Layout>
);

export default PortraitIndex;

export const PortraitIndexQuery = graphql`
  query PortraitIndexQuery {
    allFile(
      filter: {
        extension: { eq: "webp" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: "business_portfolio" }
      }
    ) {
      edges {
        node {
          id

          # Alias 1: Your original full-size settings
          full: childImageSharp {
            gatsbyImageData(width: 2000, quality: 100, layout: CONSTRAINED)
          }

          # Alias 2: The new thumbnail version
          thumbnail: childImageSharp {
            gatsbyImageData(
              width: 200 # Much smaller width
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`;

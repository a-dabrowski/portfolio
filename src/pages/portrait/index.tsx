import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import SimpleGallery from '../../components/swiper';
import { GalleryPageData } from '../../types';

const PortraitIndex = ({ data, location }: PageProps<GalleryPageData>) => (
  <Layout location={location} title="Portraits">
    <h2>PORTRAIT PHOTOGRAPHY</h2>
    <SimpleGallery galleryID="portrait" images={data.allFile.edges} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
  </Layout>
);

export default PortraitIndex;

export const Head = () => <SEO title="Adam Dabrowski | Portrait Photography" />;

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

          # Lightbox image. q80 measured 73% smaller than q100 (sources are already lossy WebP)
          full: childImageSharp {
            gatsbyImageData(width: 2000, quality: 80, layout: CONSTRAINED)
          }

          # Alias 2: The new thumbnail version
          thumbnail: childImageSharp {
            gatsbyImageData(
              width: 200 # Much smaller width
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;

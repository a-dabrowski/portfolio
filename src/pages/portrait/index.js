import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Contact from '../../components/contact';
import SEO from '../../components/seo';
import Gallery from '../../components/gallery';
import { ImageButton, MinimalButton } from '../../components/buttons';


// Header
// Text about
// List of images
// Footer?
//
const PortraitText = "Uwielbiam zamykać nastrój w pojedynczym kadrze.";

const PortraitIndex = ({ data, location }) => (
  <Layout location={location} title="Portraits">
    <SEO title="Adam Dabrowski | Portrait Photography" />
    <h2>PORTRAIT PHOTOGRAPHY</h2>
    <Gallery images={data.allFile.edges} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    </div>
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
          childImageSharp {
            gatsbyImageData(width: 2000, quality: 100, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Gallery from '../components/gallery';
import SEO from '../components/seo';
import { MinimalButton } from '../components/buttons';

const PhotographyIndex = ({ data, location }) => {
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div>
        Hello PhotographyIndex
        <MinimalButton>Hello</MinimalButton>
        <Gallery images={data.allFile.edges} />
      </div>
    </Layout>
  );
};
export default PhotographyIndex;

export const photoQuery = graphql`
  query PhotoData {
    allFile(
      filter: {
        extension: { eq: "jpg" }
        relativeDirectory: { eq: "photography/paulina" }
      }
    ) {
      edges {
        node {
          id
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
      }
    }
  }
`;

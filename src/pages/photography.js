import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Thumbnail from '../components/Thumbnail';
import SEO from '../components/seo';
import { MinimalButton } from '../components/buttons';

const PhotographyIndex = ({ data, location }) => {
  console.log(data);
  return (
    <Layout location={location} title="Fotografia">
      <SEO title="Photography section" />
      <div>
        Hello PhotographyIndex
        <MinimalButton>Hello</MinimalButton>
        {data.allFile.edges.map((el) => (
          <Thumbnail key={el.node.id} source={el.node.childImageSharp.fluid} />
        ))}
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
            }
          }
        }
      }
    }
  }
`;

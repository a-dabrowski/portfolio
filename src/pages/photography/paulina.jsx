import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Gallery from '../../components/gallery';
import SEO from '../../components/seo';
import { MinimalButton } from '../../components/buttons';

const StudioPhotography = ({ data, location }) => {
  return (
    <Layout location={location} title="Paulina">
      <SEO title="Studio photography showcase" />
      <div className="flex flex-col">
        <Gallery images={data.allFile.edges} />
        <Link className="m-auto mt-8 text-center" to="/photography">
          <MinimalButton>Powrót</MinimalButton>
        </Link>
      </div>
    </Layout>
  );
};
export default StudioPhotography;

export const StudioPhotographyQuery = graphql`
  query PhotoPaulina {
    allFile(
      filter: {
        extension: { eq: "jpg" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: "paulina" }
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

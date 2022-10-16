import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Gallery from '../../components/gallery';
import SEO from '../../components/seo';
import { MinimalButton } from '../../components/buttons';

const ZamoyskichKlaudiaPhotography = ({ data, location }) => {
  return (
    <Layout location={location} title="Klaudia - Zamoyskich Palace">
      <SEO title="Studio photography showcase" />
      <div className="flex flex-col">
        <Gallery images={data.allFile.edges} />
        <Link className="m-auto mt-8 text-center" to="/">
          <MinimalButton>Back</MinimalButton>
        </Link>
      </div>
    </Layout>
  );
};
export default ZamoyskichKlaudiaPhotography;

export const ZamoyskichKlaudiaQuery = graphql`
  query ZamoyskichKlaudia {
    allFile(
      filter: {
        extension: { eq: "jpg" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: "zamoyskich_klaudia" }
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

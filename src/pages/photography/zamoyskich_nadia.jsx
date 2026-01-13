import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import SimpleGallery from '../../components/swiper';
import SEO from '../../components/seo';
import { MinimalButton } from '../../components/buttons';

const ZamoyskichNadiaPhotography = ({ data, location }) => {
  return (
    <Layout location={location} title="Wiktoria - Fort Bema">
      <SEO title="Studio photography showcase" />
      <div className="flex flex-col">
        <SimpleGallery
          galleryID="zamoyskichnadia"
          images={data.allFile.edges}
        />
        <Link className="m-auto mt-8 text-center" to="/">
          <MinimalButton>Back</MinimalButton>
        </Link>
      </div>
    </Layout>
  );
};
export default ZamoyskichNadiaPhotography;

export const ZamoyskichNadiaQuery = graphql`
  query ZamoyskichNadia {
    allFile(
      filter: {
        extension: { eq: "webp" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: "zamoyskich_nadia" }
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

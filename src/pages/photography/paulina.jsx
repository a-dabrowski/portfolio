import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import SimpleGallery from '../../components/swiper';
import SEO from '../../components/seo';
import { MinimalButton } from '../../components/buttons';

const StudioPhotography = ({ data, location }) => {
  return (
    <Layout location={location} title="Paulina">
      <SEO title="Studio photography showcase" />
      <div className="flex flex-col">
        <SimpleGallery galleryID="paulina" images={data.allFile.edges} />
        <Link className="m-auto mt-8 text-center" to="/">
          <MinimalButton>Back</MinimalButton>
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
        extension: { eq: "webp" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: "paulina" }
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

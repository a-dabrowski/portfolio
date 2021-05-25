import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import Gallery from '../../components/gallery';
import SEO from '../../components/seo';
import { MinimalButton } from '../../components/buttons';

const StudioPhotography = ({ data, location }) => {
  return (
    <Layout location={location} title="F.R.I.E.N.D.S">
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

export const StudioPhotographyQuery = graphql`query PhotoStudio {
  allFile(
    filter: {extension: {eq: "jpg"}, sourceInstanceName: {eq: "photography"}, relativeDirectory: {eq: "studio_friends"}}
  ) {
    edges {
      node {
        id
        childImageSharp {
          gatsbyImageData(width: 900, layout: CONSTRAINED)
        }
      }
    }
  }
}
`;

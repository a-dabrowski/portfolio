import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import SimpleGallery from '../../components/swiper';
import { MinimalButton } from '../../components/buttons';
import { GalleryPageData } from '../../types';

const FortBemaAnnaPhotography = ({
  data,
  location,
}: PageProps<GalleryPageData>) => {
  return (
    <Layout location={location} title="Anna - FortBema">
      <div className="flex flex-col">
        <SimpleGallery galleryID="fortbemaanna" images={data.allFile.edges} />
        <Link className="m-auto mt-8 text-center" to="/">
          <MinimalButton>Back</MinimalButton>
        </Link>
      </div>
    </Layout>
  );
};
export default FortBemaAnnaPhotography;

export const Head = () => <SEO title="Studio photography showcase" />;

export const FortBemaAnnaQuery = graphql`
  query AnnaFortBema {
    allFile(
      filter: {
        extension: { eq: "webp" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: "fort_bema_anna" }
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

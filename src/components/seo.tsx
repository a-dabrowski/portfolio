import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProps {
  description?: string;
  lang?: string;
  title: string;
}

// Rendered from each page's exported `Head` (Gatsby Head API), so the tags are
// written into the static HTML at build time with no client-side head library.
const SEO = ({ description = '', lang = 'pl', title }: SEOProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <>
      <html lang={lang} />
      <title>{`${title} | ${site.siteMetadata.title}`}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
};

export default SEO;

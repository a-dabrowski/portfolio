/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 150, height: 150, layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            instagram
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div className="flex flex-col items-center">
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author}
        style={{
          marginBottom: 0,
          minWidth: 100,
          minHeight: 100,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p className="ml-2">
        Written by <strong>{author}</strong> who lives and works in Warsaw
        creating things.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
        {` `}
        <a href={`https://twitter.com/${social.instagram}`}>Instagram</a>
      </p>
    </div>
  );
};

export default Bio;

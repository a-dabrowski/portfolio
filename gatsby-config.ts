import type { GatsbyConfig } from 'gatsby';

import plDictionary from './content/i18n/pl.json';

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata: {
    title: `Dąbrowski Studio`,
    author: `Adam Dabrowski`,
    description: `Stand-up, teksty i fotografia — Adam Dąbrowski, Warszawa`,
    siteUrl: `https://dabrowski.studio`,
    social: {
      twitter: `Dabrowski_AD`,
      instagram: `adam_dabrowski`,
    },
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', '.cache', 'public'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/texts`,
        name: `texts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/photography`,
        name: `photography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets\/svg/,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // Width of the article text column (Prose.module.scss).
              maxWidth: 680,
              quality: 75,
              // The image alt text becomes the margin caption of the figure.
              showCaptions: true,
              linkImagesToOriginal: false,
            },
          },
          // Must run after gatsby-remark-images: it lifts the generated
          // <figure> out of its paragraph.
          {
            // Absolute path: Parcel compiles this file and strips require.resolve.
            resolve: `${__dirname}/plugins/gatsby-remark-studio-text`,
            options: {
              redactionTitle: plDictionary.article.redaction,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Caugt Varyat Creations`,
        short_name: `CVC`,
        start_url: `/`,
        background_color: `#f3f2f2`,
        theme_color: `#ec3013`,
        display: `minimal-ui`,
        icon: `content/assets/favicons/ad_mono.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};

export default config;

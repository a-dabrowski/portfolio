import path from 'path';
import type { GatsbyNode } from 'gatsby';

import galleries from './content/photography/galleries.json';
import {
  LOCALES,
  PHOTOGRAPHY_PATH,
  galleryPath,
  localizedPath,
  textPath,
  textsIndexPath,
} from './src/i18n/locales';

interface TextsQueryResult {
  allMarkdownRemark: {
    nodes: Array<{
      id: string;
      fields: { slug: string };
      frontmatter: { title: string };
    }>;
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  for (const locale of LOCALES) {
    createPage({
      path: localizedPath(locale, '/'),
      component: path.resolve(`./src/templates/home.tsx`),
      context: { locale },
    });

    createPage({
      path: localizedPath(locale, `${PHOTOGRAPHY_PATH}/`),
      component: path.resolve(`./src/templates/photography.tsx`),
      context: { locale },
    });

    createPage({
      path: textsIndexPath(locale),
      component: path.resolve(`./src/templates/texts.tsx`),
      context: { locale },
    });

    galleries.forEach((gallery, index) => {
      createPage({
        path: galleryPath(locale, gallery.slug),
        component: path.resolve(`./src/templates/gallery.tsx`),
        context: {
          locale,
          directory: gallery.directory,
          title: gallery.title,
          number: index + 1,
        },
      });
    });

    // Oldest first, so a text keeps its number when newer ones are added.
    const result = await graphql<TextsQueryResult>(
      `
        query TextsByLocale($locale: String!) {
          allMarkdownRemark(
            filter: { fields: { locale: { eq: $locale } } }
            sort: { frontmatter: { date: ASC } }
          ) {
            nodes {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      `,
      { locale }
    );

    if (result.errors) {
      throw result.errors;
    }

    const texts = result.data!.allMarkdownRemark.nodes;

    texts.forEach((text, index) => {
      // Reading order runs newest to oldest and wraps around, like the
      // texts index.
      const nextIndex = (index - 1 + texts.length) % texts.length;
      const previousIndex = (index + 1) % texts.length;

      createPage({
        path: textPath(locale, text.fields.slug),
        component: path.resolve(`./src/templates/text.tsx`),
        context: {
          id: text.id,
          locale,
          number: index + 1,
          count: texts.length,
          previousPath: textPath(locale, texts[previousIndex].fields.slug),
          next: {
            path: textPath(locale, texts[nextIndex].fields.slug),
            title: texts[nextIndex].frontmatter.title,
            number: nextIndex + 1,
          },
        },
      });
    });
  }
};

// content/texts/<locale>/<slug>.md — the folder is the language, the file name
// is the URL slug. The same file name in two language folders is one text in
// two languages.
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  if (node.internal.type !== `MarkdownRemark` || !node.parent) {
    return;
  }

  const file = getNode(node.parent);
  if (!file || file.sourceInstanceName !== `texts`) {
    return;
  }

  actions.createNodeField({
    node,
    name: `locale`,
    value: file.relativeDirectory,
  });
  actions.createNodeField({ node, name: `slug`, value: file.name });
};

// Declared explicitly so an optional field that no text uses yet (or a
// language folder with no texts) does not break the page queries.
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
      type MarkdownRemark implements Node {
        frontmatter: TextFrontmatter!
        fields: TextFields!
      }
      type TextFrontmatter {
        title: String!
        date: Date! @dateformat
        form: String
        stamp: String
        scale: Float
        dateline: String
        dek: String
        lede: String
      }
      type TextFields {
        slug: String!
        locale: String!
      }
    `);
  };

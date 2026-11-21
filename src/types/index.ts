import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface GalleryImageNode {
  node: {
    id: string;
    full: {
      gatsbyImageData: IGatsbyImageData & {
        images: { fallback: { src: string } };
      };
    };
    thumbnail: {
      gatsbyImageData: IGatsbyImageData & {
        images: { fallback: { src: string } };
      };
    };
  };
}

export interface GalleryPageData {
  allFile: {
    edges: GalleryImageNode[];
  };
}

export interface ImageFileNode {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export interface SiteMetadata {
  title: string;
  author: string;
  description: string;
  siteUrl: string;
  social: {
    twitter: string;
    instagram: string;
  };
}

export interface MarkdownRemarkNode {
  id: string;
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    description?: string;
  };
}

export interface BlogPostNode {
  node: {
    fields: { slug: string };
    frontmatter: { title: string };
  };
}

export interface TextFrontmatter {
  title: string;
  year: string;
  form: string | null;
  stamp: string | null;
  scale: number | null;
  dateline: string | null;
  dek: string | null;
  lede: string | null;
}

// Shape of the TextSummary GraphQL fragment (src/templates/texts.tsx).
export interface TextSummaryNode {
  id: string;
  timeToRead: number;
  fields: { slug: string };
  frontmatter: Pick<
    TextFrontmatter,
    'title' | 'year' | 'form' | 'dek' | 'stamp' | 'scale'
  >;
}

// A text as the list pages show it: with its number and URL.
export interface ListedText extends TextSummaryNode {
  number: string;
  path: string;
}

// One row of the home page newsboard (content/news/<locale>.json).
export interface NewsEntry {
  // YYYY-MM-DD; after today is listed as upcoming, today or earlier as recent.
  date: string;
  title: string;
  tag?: string;
  place?: string;
  note?: string;
  // Site path ("/texts/slug/") or web address; makes the row a link.
  href?: string;
}

export interface LocalePageContext {
  locale: 'pl';
}

export interface Gallery {
  slug: string;
  directory: string;
  title: string;
}

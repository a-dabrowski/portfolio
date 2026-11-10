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

export interface ProjectData {
  name: string;
  image: string;
  demo: string;
  code: string;
  description: string;
}

export interface StackItem {
  name: string;
  path: string;
  fill?: string;
  description?: string;
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

export interface TextSummaryNode {
  id: string;
  fields: { slug: string };
  frontmatter: Pick<TextFrontmatter, 'title' | 'year' | 'form' | 'lede'>;
}

export interface LocalePageContext {
  locale: 'pl';
}

export interface Gallery {
  slug: string;
  directory: string;
  title: string;
}

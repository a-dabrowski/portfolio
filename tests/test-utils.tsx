import { useStaticQuery } from 'gatsby';

export const mockSiteMetadata = {
  title: 'Adam Dabrowski Studio',
  author: 'Adam Dabrowski',
  description: 'Webpage to showcase work of Adam Dabrowski',
  siteUrl: 'https://dabrowski.studio',
  social: {
    twitter: 'Dabrowski_AD',
    instagram: 'adam_dabrowski',
  },
};

export const mockGalleryImage = {
  node: {
    id: 'test-image-1',
    full: {
      gatsbyImageData: {
        layout: 'constrained' as const,
        width: 2000,
        height: 1333,
        images: {
          fallback: { src: '/static/test-full.webp' },
        },
      },
    },
    thumbnail: {
      gatsbyImageData: {
        layout: 'constrained' as const,
        width: 200,
        height: 133,
        images: {
          fallback: { src: '/static/test-thumb.webp' },
        },
      },
    },
  },
};

export const mockGalleryImages = [
  mockGalleryImage,
  {
    node: {
      id: 'test-image-2',
      full: {
        gatsbyImageData: {
          layout: 'constrained' as const,
          width: 2000,
          height: 1500,
          images: {
            fallback: { src: '/static/test-full-2.webp' },
          },
        },
      },
      thumbnail: {
        gatsbyImageData: {
          layout: 'constrained' as const,
          width: 200,
          height: 150,
          images: {
            fallback: { src: '/static/test-thumb-2.webp' },
          },
        },
      },
    },
  },
];

export const mockBlogPost = {
  id: 'post-1',
  excerpt: 'This is a test blog post excerpt',
  html: '<p>Hello World content</p>',
  fields: { slug: '/hello-world/' },
  frontmatter: {
    title: 'Hello World',
    date: 'May 01, 2015',
    description: 'My first post',
  },
};

export const mockProjectData = {
  name: 'Test Project',
  image: '/screenshots/test.png',
  demo: 'https://example.com/demo',
  code: 'https://github.com/test/project',
  description: 'A test project description',
};

export const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  href: 'http://localhost:8000/',
  origin: 'http://localhost:8000',
  protocol: 'http:',
  host: 'localhost:8000',
  hostname: 'localhost',
  port: '8000',
  state: null,
  key: 'testKey',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  ancestorOrigins: {} as DOMStringList,
} as unknown as Location;

export function setupUseStaticQuery() {
  (useStaticQuery as jest.Mock).mockReturnValue({
    site: {
      siteMetadata: mockSiteMetadata,
    },
    avatar: {
      childImageSharp: {
        gatsbyImageData: {
          layout: 'fixed',
          width: 150,
          height: 150,
          images: {
            fallback: { src: '/static/avatar.jpg' },
          },
        },
      },
    },
  });
}

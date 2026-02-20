const React = require('react');

const GatsbyImage = jest.fn().mockImplementation(({ image, alt, ...rest }) =>
  React.createElement('img', {
    ...rest,
    src: 'test-image.jpg',
    alt: alt || '',
    'data-testid': 'gatsby-image',
  })
);

const StaticImage = jest.fn().mockImplementation(({ src, alt, ...rest }) =>
  React.createElement('img', {
    ...rest,
    src: src || 'test-static-image.jpg',
    alt: alt || '',
    'data-testid': 'static-image',
  })
);

module.exports = {
  GatsbyImage,
  StaticImage,
  getImage: jest.fn(),
  getSrc: jest.fn(),
};

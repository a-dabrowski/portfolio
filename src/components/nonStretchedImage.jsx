import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const NonStretchedImage = (props) => {
  let normalizedProps = props;

  normalizedProps = {
    ...props,
    imgStyle: { objectFit: 'contain' },
    style: {
      ...(props.style || {}),
      //maxWidth: props.fluid.presentationWidth,
      //maxHeight: window.innerHeight - 50px,
      //height: window.innerHeight - 50,
      height: '90vh',
      width: '90vw',
      margin: '60px 10px 30px', // Used to center the image
    },
  };

  return <GatsbyImage {...normalizedProps} />;
};
export default NonStretchedImage;

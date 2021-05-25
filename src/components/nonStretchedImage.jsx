import React from 'react';
import Image from 'gatsby-image';

const NonStretchedImage = (props) => {
  let normalizedProps = props;
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      imgStyle: { objectFit: "contain" },
      style: {
        ...(props.style || {}),
//maxWidth: props.fluid.presentationWidth,
        //maxHeight: window.innerHeight - 50px,
//height: window.innerHeight - 50,
        maxHeight: '90vh',
        maxWidth: '90vw',
        margin: 'auto', // Used to center the image
      },
    };
  }

  return <Image {...normalizedProps} />;
};
export default NonStretchedImage;

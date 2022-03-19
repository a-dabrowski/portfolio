import React from 'react';
import LightboxReact from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import NonStretchedImage from './nonStretchedImage';

const Lightbox = ({
  images,
  selectedImage,
  handleClose,
  handlePrevRequest,
  handleNextRequest,
}) => {
  const array = [];

  images.forEach((image) =>
    array.push(image.node.childImageSharp.gatsbyImageData.images.fallback.src)
  );

  return (
    <LightboxReact
      enableZoom={false}
      clickOutsideToClose={true}
      mainSrc={array[selectedImage]}
      nextSrc={array[(selectedImage + 1) % array.length]}
      prevSrc={array[(selectedImage + array.length - 1) % images.length]}
      onCloseRequest={handleClose}
      onMovePrevRequest={handlePrevRequest(selectedImage, array.length)}
      onMoveNextRequest={handleNextRequest(selectedImage, array.length)}
    />
  );
};

export default Lightbox;

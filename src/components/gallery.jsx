import React, { useState } from 'react';

import Thumbnail from '../components/thumbnail';
import Lightbox from '../components/lightbox';

const Gallery = ({ images }) => {
  const [isShowLightbox, setShowLightbox] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const handleClose = () => {
    setShowLightbox(false);
    setActiveImage(null);
  };

  const handleOpen = (index) => {
    setShowLightbox(true);
    setActiveImage(index);
  };

  const handleNext = (index, length) => (e) => {
    setActiveImage((index + 1) % length);
  };
  const handlePrev = (index, length) => (e) => {
    setActiveImage((index - 1 + length) % length);
  };
  console.log(images, 'images');

  return (
    <div>
      {images?.map((el, index) => (
        <Thumbnail
          index={index}
          key={el.node.id}
          handleOpen={handleOpen}
          source={el.node.childImageSharp.fluid}
        />
      ))}
      {isShowLightbox && activeImage !== null && (
        <Lightbox
          images={images}
          handleClose={handleClose}
          handlePrevRequest={handlePrev}
          handleNextRequest={handleNext}
          selectedImage={activeImage}
        />
      )}
    </div>
  );
};

export default Gallery;

import React, { useState } from 'react';

import Thumbnail from '../components/thumbnail';
import Lightbox from '../components/lightbox';

const Gallery = ({ images }) => {
  const [isShowLightbox, setShowLightbox] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [lastActiveImage, setLastActiveImage] = useState(null);

  const handleClose = () => {
    setShowLightbox(false);
    setActiveImage(null);
  };

  const handleOpen = (index) => {
    setShowLightbox(true);
    setActiveImage(index);
    setLastActiveImage(index);
  };

  const handleNext = (index, length) => (e) => {
    setActiveImage((index + 1) % length);
    setLastActiveImage((index + 1) % length);
  };
  const handlePrev = (index, length) => (e) => {
    setActiveImage((index - 1 + length) % length);
    setLastActiveImage((index - 1 + length) % length);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 place-items-center">
      {images?.map((el, index) => (
        <Thumbnail
          index={index}
          isActive={index === lastActiveImage}
          key={el.node.id}
          handleOpen={handleOpen}
          source={el.node.childImageSharp.gatsbyImageData}
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

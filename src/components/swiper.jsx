import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

export default function SimpleGallery(props) {
  const array = [];
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  props.images.forEach((image) =>
    array.push({
      largeURL: image.node.full.gatsbyImageData.images.fallback.src,
      thumbnailURL: image.node.thumbnail.gatsbyImageData.images.fallback.src,
      width: image.node.full.gatsbyImageData.width,
      height: image.node.full.gatsbyImageData.height,
    })
  );

  return (
    <div className="pswp-gallery flex flex-wrap" id={props.galleryID}>
      {array.map((image, index) => (
        <a
          href={image.largeURL}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={props.galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
          className="p-4"
        >
          <img src={image.thumbnailURL} alt="" />
        </a>
      ))}
    </div>
  );
}

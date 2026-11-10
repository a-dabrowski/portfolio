import React, { useEffect } from 'react';
import classNames from 'classnames';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

import { GalleryImageNode } from '../types';
import * as Styles from './gallery/Gallery.module.scss';

interface SimpleGalleryProps {
  galleryID: string;
  images: GalleryImageNode[];
}

export default function SimpleGallery(props: SimpleGalleryProps) {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    // Fetch the PhotoSwipe core chunk now so the first thumbnail click opens
    // the lightbox without waiting on a network round trip. A failure here is
    // harmless: pswpModule retries the import on click and surfaces it there.
    import('photoswipe').catch(() => undefined);

    return () => {
      lightbox?.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div
      className={classNames('pswp-gallery', Styles.grid)}
      id={props.galleryID}
    >
      {props.images.map((image) => {
        const full = image.node.full.gatsbyImageData;
        const thumbnail = image.node.thumbnail.gatsbyImageData;
        return (
          <a
            href={full.images.fallback.src}
            data-pswp-srcset={full.images.fallback.srcSet}
            data-pswp-width={full.width}
            data-pswp-height={full.height}
            // The thumbnail is a square crop of the full image; without this
            // the lightbox zoom animation starts from the wrong frame.
            data-cropped="true"
            key={image.node.id}
            target="_blank"
            rel="noreferrer"
            className={Styles.plate}
          >
            <img
              src={thumbnail.images.fallback.src}
              srcSet={thumbnail.images.fallback.srcSet}
              sizes={thumbnail.images.fallback.sizes}
              width={thumbnail.width}
              height={thumbnail.height}
              loading="lazy"
              decoding="async"
              alt=""
            />
          </a>
        );
      })}
    </div>
  );
}

import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface ImageButtonProps {
  image: IGatsbyImageData;
  children?: React.ReactNode;
  handleClick?: () => void;
  loading?: 'eager' | 'lazy';
}

const ImageButton = ({
  image,
  children,
  handleClick,
  loading,
}: ImageButtonProps) => (
  <button
    className="group transition relative overflow-hidden h-32 w-48 sm:h-96 sm:w-96 cursor-pointer"
    onClick={handleClick}
  >
    <GatsbyImage
      image={image}
      alt=""
      loading={loading}
      style={{ position: 'absolute', inset: 0 }}
    />
    <span className="absolute bottom-3 left-3 transition uppercase bg-white p-2 text-black group-hover:text-white group-hover:bg-black">
      {children}
    </span>
  </button>
);

export default ImageButton;

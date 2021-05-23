import React from 'react';

const ImageButton = ({ image, children, handleClick }) => (
  <button
    className="relative h-32 w-48 sm:h-72 sm:w-72 bg-center bg-cover bg-top cursor-pointer"
    onClick={handleClick}
    style={{ backgroundImage: `url("${image}")` }}
  >
    <span className="absolute bottom-3 left-3 transition uppercase bg-white p-2 text-black hover:text-white hover:bg-black">{children}</span>
  </button>
);

export default ImageButton;

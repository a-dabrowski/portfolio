import React from 'react';

const ImageButton = ({ image, children, handleClick }) => (
  <button
    className={`group transition relative h-32 w-48 sm:h-96 sm:w-96 bg-center bg-cover cursor-pointer bg-blend-overlay`}
    onClick={handleClick}
    style={{ backgroundImage: `url("${image}")` }}
  >
    <span className="absolute bottom-3 left-3 transition uppercase bg-white p-2 text-black group-hover:text-white group-hover:bg-black">
      {children}
    </span>
  </button>
);

export default ImageButton;

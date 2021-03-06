import React from 'react';

const MinimalButton = ({ isFull, children, isFixedWidth }) => {
  return (
    <button
      className={`p-6 uppercase transition bg-white text-black hover:bg-black hover:text-white border-solid border-2 border-black ${
        isFixedWidth && 'sm:w-72'
      }`}
    >
      {children}
    </button>
  );
};

export { MinimalButton };
export default MinimalButton;

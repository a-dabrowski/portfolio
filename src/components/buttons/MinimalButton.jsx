import React from 'react';

const MinimalButton = ({
  isFull,
  children,
  isFixedWidth,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled || false}
      className={`px-6 py-4 uppercase transition bg-white text-black hover:bg-black hover:text-white border-solid border-2 border-black disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed ${
        isFixedWidth ? 'sm:w-72' : ''
      } ${className || ''}`}
    >
      {children}
    </button>
  );
};

export { MinimalButton };
export default MinimalButton;

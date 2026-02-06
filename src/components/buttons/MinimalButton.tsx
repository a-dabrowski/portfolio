import React from 'react';

interface MinimalButtonProps {
  isFull?: boolean;
  children?: React.ReactNode;
  isFixedWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MinimalButton = ({
  children,
  isFixedWidth,
  className,
  disabled,
}: MinimalButtonProps) => {
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

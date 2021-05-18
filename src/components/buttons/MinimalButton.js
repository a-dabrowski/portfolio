import React from "react";

import "./MinimalButton.scss";
const Cta = ({isFull, children, isFixedWidth}) => {
  return (
    <button className={`minimal-button ${isFixedWidth && 'sm:w-72'}`}>
      {children}
    </button>
  );
};


export default Cta

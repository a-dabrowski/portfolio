import React from "react";

import "./MinimalButton.scss";
const Cta = ({isFull, children}) => {
  return (
    <button className="minimal-button">
      {children}
    </button>
  );
};


export default Cta

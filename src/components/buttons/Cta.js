import React from "react";

import "./Cta.css";
const Cta = (props) => {
  return (
    <button className="btn btn-cta">
      {props.children}
    </button>
  );
};


export default Cta

import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

export const Thumbnail = ({ source, handleOpen, index }) => (
<div onClick={() => handleOpen(index)} className="m-3 w-full">
    <GatsbyImage image={source} />
  </div>
);

export default Thumbnail;

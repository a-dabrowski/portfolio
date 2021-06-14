import React from 'react';
import classnames from 'classnames';
import { GatsbyImage } from "gatsby-plugin-image";

export const Thumbnail = ({ source, handleOpen, index, isActive }) => (
<div onClick={() => handleOpen(index)} className={classnames('m-3', 'w-full', 'border-4', 'border-transparent', {'border-red-700': isActive})}>
    <GatsbyImage style={{display: 'block'}} image={source} />
  </div>
);

export default Thumbnail;

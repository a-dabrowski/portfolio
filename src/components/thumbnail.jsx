import React from 'react';
import Image from 'gatsby-image';

export const Thumbnail = ({ source, handleOpen, index }) => (
<div onClick={() => handleOpen(index)} className="m-3 w-full">
    <Image fluid={source} />
  </div>
);

export default Thumbnail;

import React from 'react';
import Image from 'gatsby-image';

export const Thumbnail = ({ source, handleOpen, index }) => (
<div onClick={() => handleOpen(index)} className="m-3 w-1/2 md:w-1/3">
    <Image fluid={source} />
  </div>
);

export default Thumbnail;

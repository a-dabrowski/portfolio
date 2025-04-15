import React from 'react';
import classnames from 'classnames';
import { GatsbyImage } from 'gatsby-plugin-image';

// TODO handle different aspect ratios for horizontal and vertical

export const Thumbnail = ({ source, handleOpen, index, isActive }) => (
  <div
    onClick={() => handleOpen(index)}
    className={classnames('m-3', 'w-full', 'border-4', 'border-transparent', 'overflow-hidden', 'flex', 'items-center', 'justify-center', {
      'border-red-700': isActive,
    })}
  >
    <GatsbyImage style={{ display: 'block' }} image={source} alt="" />
  </div>
);

export default Thumbnail;

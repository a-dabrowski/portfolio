import React from 'react';
import Image from 'gatsby-image';

import Styles from './Thumbnail.module.scss';

export const Thumbnail = ({ source, handleOpen, index }) => (
  <div onClick={() => handleOpen(index)} className={Styles.thumbnail}>
    <Image fluid={source} />
  </div>
);

export default Thumbnail;

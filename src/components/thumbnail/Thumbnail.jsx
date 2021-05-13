import React from 'react';
import Image from 'gatsby-image';

import Styles from './Thumbnail.module.scss';

export const Thumbnail = ({ source }) => (
  <div className={Styles.thumbnail}>
    <Image fluid={source} />
  </div>
);

export default Thumbnail;

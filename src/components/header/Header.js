import React from 'react';
import * as Styles from './Header.module.scss';

const Header = ({ children }) => {
  return <h3 className={Styles.main}>{children}</h3>;
};

export default Header;

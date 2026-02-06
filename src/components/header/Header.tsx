import React, { PropsWithChildren } from 'react';
import * as Styles from './Header.module.scss';

const Header = ({ children }: PropsWithChildren) => {
  return <h3 className={Styles.main}>{children}</h3>;
};

export default Header;

import React from 'react';

import { useDictionary } from '../../i18n';
import { Container } from '../section';
import { Accent } from '../typography';
import * as Styles from './Site.module.scss';

const SiteFooter = () => {
  const { site } = useDictionary();

  return (
    <footer className={Styles.footer}>
      <Container className={Styles.footerRow}>
        <span>
          © {new Date().getFullYear()} {site.copyright}
        </span>
        <span>
          <Accent>●</Accent> {site.footerTagline}
        </span>
      </Container>
    </footer>
  );
};

export default SiteFooter;

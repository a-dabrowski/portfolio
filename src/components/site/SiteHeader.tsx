import React from 'react';
import { Link } from 'gatsby';

import {
  DISPLAYED_LOCALES,
  LOCALES,
  PHOTOGRAPHY_PATH,
  localizedPath,
  useDictionary,
  useLocale,
} from '../../i18n';
import { ArrowLink } from '../links';
import { Container } from '../section';
import { Label, Numeral } from '../typography';
import * as Styles from './Site.module.scss';

const SiteHeader = () => {
  const locale = useLocale();
  const { site, nav } = useDictionary();
  const availableLocales: readonly string[] = LOCALES;

  return (
    <header className={Styles.header}>
      <Container className={Styles.headerGrid}>
        <Link to={localizedPath(locale, '/')} className={Styles.brand}>
          <span className={Styles.brandName}>{site.brand}</span>
          <span>{site.discipline}</span>
          <span>{site.place}</span>
        </Link>
        <nav className={Styles.nav}>
          <ArrowLink to={localizedPath(locale, '/#texts')}>
            {nav.texts}
          </ArrowLink>
          <ArrowLink to={localizedPath(locale, '/#contact')}>
            {nav.contact}
          </ArrowLink>
          <ArrowLink to={localizedPath(locale, `${PHOTOGRAPHY_PATH}/`)}>
            {nav.photography}
          </ArrowLink>
        </nav>
        <div className={Styles.languages}>
          {DISPLAYED_LOCALES.map((code, index) => (
            <React.Fragment key={code}>
              {index > 0 && ' / '}
              {code === locale ? (
                <span className={Styles.languageCurrent}>{code}</span>
              ) : availableLocales.includes(code) ? (
                <Link
                  to={localizedPath(code, '/')}
                  className={Styles.languageLink}
                  hrefLang={code}
                >
                  {code}
                </Link>
              ) : (
                <span className={Styles.languageInactive}>{code}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={Styles.season}>
          <Numeral size="season">{site.season}</Numeral>
          <Label size="extraSmall" tone="muted">
            {site.seasonLabel}
          </Label>
        </div>
      </Container>
    </header>
  );
};

export default SiteHeader;

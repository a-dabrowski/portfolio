import React from 'react';

import { DEFAULT_LOCALE, Locale, LocaleProvider } from '../i18n';
import SiteHeader from './site/SiteHeader';
import SiteFooter from './site/SiteFooter';
import * as Styles from './site/Site.module.scss';

interface LayoutProps {
  // Language of the page; templates pass it from pageContext.
  locale?: Locale;
  children: React.ReactNode;
}

const Layout = ({ locale = DEFAULT_LOCALE, children }: LayoutProps) => (
  <LocaleProvider value={locale}>
    <div className={Styles.page}>
      <SiteHeader />
      <main className={Styles.main}>{children}</main>
      <SiteFooter />
    </div>
  </LocaleProvider>
);

export default Layout;

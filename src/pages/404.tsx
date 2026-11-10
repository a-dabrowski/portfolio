import React from 'react';

import { Button } from '../components/buttons';
import Layout from '../components/layout';
import { Container } from '../components/section';
import SEO from '../components/seo';
import { Body, Display } from '../components/typography';
import { DEFAULT_LOCALE, dictionaries } from '../i18n';
import * as Styles from './pages.module.scss';

const { notFound } = dictionaries[DEFAULT_LOCALE];

const NotFoundPage = () => (
  <Layout>
    <Container className={Styles.page}>
      <div className={Styles.stack}>
        <Display as="h1" size="hero">
          {notFound.heading}
        </Display>
        <Body size="large">{notFound.message}</Body>
        <Button variant="primary" to="/" arrow="→">
          {notFound.action}
        </Button>
      </div>
    </Container>
  </Layout>
);

export default NotFoundPage;

export const Head = () => <SEO title={notFound.seoTitle} />;

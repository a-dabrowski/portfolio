import React from 'react';

import { Button } from '../../components/buttons';
import ContactForm from '../../components/contactForm';
import Layout from '../../components/layout';
import PhotographyForm from '../../components/photoForm';
import { Container } from '../../components/section';
import SEO from '../../components/seo';
import { Display, Heading } from '../../components/typography';
import { DEFAULT_LOCALE, dictionaries, PHOTOGRAPHY_PATH } from '../../i18n';
import * as Styles from '../pages.module.scss';

const { offer, photography } = dictionaries[DEFAULT_LOCALE];

const OfferPhotography = () => (
  <Layout>
    <Container className={Styles.page}>
      <div className={Styles.stack}>
        <Button variant="ghost" to={`${PHOTOGRAPHY_PATH}/`}>
          ← {photography.allGalleries}
        </Button>
        <Display as="h1" size="page">
          {offer.heading}
        </Display>
        <Heading as="h2">{offer.stepsHeading}</Heading>
        <ol className={Styles.steps}>
          {offer.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className={Styles.forms}>
          <ContactForm />
          <PhotographyForm />
        </div>
      </div>
    </Container>
  </Layout>
);

export default OfferPhotography;

export const Head = () => <SEO title={offer.seoTitle} />;

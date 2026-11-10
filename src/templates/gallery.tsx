import React from 'react';
import { graphql, HeadProps, PageProps } from 'gatsby';

import { Button } from '../components/buttons';
import Layout from '../components/layout';
import { Container, Rule } from '../components/section';
import SEO from '../components/seo';
import SimpleGallery from '../components/swiper';
import { Body, Display, Label } from '../components/typography';
import {
  dictionaries,
  format,
  localizedPath,
  padNumber,
  PHOTOGRAPHY_PATH,
} from '../i18n';
import { GalleryPageData, LocalePageContext } from '../types';
import * as Styles from './photography.module.scss';

interface GalleryContext extends LocalePageContext {
  directory: string;
  title: string;
  number: number;
}

const GalleryTemplate = ({
  data,
  pageContext: { locale, directory, title, number },
}: PageProps<GalleryPageData, GalleryContext>) => {
  const { photography } = dictionaries[locale];

  return (
    <Layout locale={locale}>
      <Container className={Styles.page}>
        <Button
          variant="ghost"
          to={localizedPath(locale, `${PHOTOGRAPHY_PATH}/`)}
          className={Styles.back}
        >
          ← {photography.allGalleries}
        </Button>
        <div className={Styles.galleryHead}>
          <Display as="h1" size="page" className={Styles.galleryTitle}>
            {title}
          </Display>
          <div className={Styles.galleryMeta}>
            <Label isStrong>
              {format(photography.plate, { number: padNumber(number) })} —{' '}
              {format(photography.count, { count: data.allFile.edges.length })}
            </Label>
            <Rule />
            <Body size="large">{photography.hint}</Body>
          </div>
        </div>
        <SimpleGallery galleryID={directory} images={data.allFile.edges} />
        <div className={Styles.galleryFoot}>
          <Button variant="primary" to={`${PHOTOGRAPHY_PATH}/offer/`} arrow="→">
            {photography.offerAction}
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default GalleryTemplate;

export const Head = ({
  pageContext: { locale, title },
}: HeadProps<GalleryPageData, GalleryContext>) => (
  <SEO
    title={`${title} — ${dictionaries[locale].photography.seoTitle}`}
    lang={locale}
  />
);

export const pageQuery = graphql`
  query GalleryImages($directory: String!) {
    allFile(
      filter: {
        extension: { eq: "webp" }
        sourceInstanceName: { eq: "photography" }
        relativeDirectory: { eq: $directory }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          id

          # Lightbox image. q80 measured 73% smaller than q100 (sources are already lossy WebP)
          full: childImageSharp {
            gatsbyImageData(width: 2000, quality: 80, layout: CONSTRAINED)
          }

          # Square plate. Plates render 160-320px wide (Gallery.module.scss),
          # so 320px plus the default 2x density covers retina screens.
          thumbnail: childImageSharp {
            gatsbyImageData(
              width: 320
              aspectRatio: 1
              quality: 75
              layout: CONSTRAINED
              sizes: "(min-width: 700px) 240px, 45vw"
            )
          }
        }
      }
    }
  }
`;

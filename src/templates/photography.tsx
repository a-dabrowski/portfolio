import React from 'react';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import galleries from '../../content/photography/galleries.json';
import { Button } from '../components/buttons';
import Layout from '../components/layout';
import { RowLink } from '../components/links';
import { Container } from '../components/section';
import SEO from '../components/seo';
import { Body, Display, Label, Lines } from '../components/typography';
import {
  dictionaries,
  format,
  galleryPath,
  localizedPath,
  padNumber,
} from '../i18n';
import { LocalePageContext } from '../types';
import * as Styles from './photography.module.scss';

interface PhotographyData {
  allFile: {
    group: Array<{
      fieldValue: string;
      nodes: Array<{
        lead: { gatsbyImageData: IGatsbyImageData };
        tile: { gatsbyImageData: IGatsbyImageData };
      }>;
    }>;
  };
}

const Photography = ({
  data,
  pageContext: { locale },
}: PageProps<PhotographyData, LocalePageContext>) => {
  const { photography } = dictionaries[locale];
  const plates = galleries.map((gallery, index) => ({
    ...gallery,
    number: format(photography.plate, { number: padNumber(index + 1) }),
    path: galleryPath(locale, gallery.slug),
    cover: data.allFile.group.find(
      (group) => group.fieldValue === gallery.directory
    )?.nodes[0],
  }));
  const [leadPlate, ...otherPlates] = plates;

  return (
    <Layout locale={locale}>
      <Container className={Styles.page}>
        <Button
          variant="ghost"
          to={localizedPath(locale, '/')}
          className={Styles.back}
        >
          ← {photography.back}
        </Button>
        <div className={Styles.split}>
          <Link
            to={leadPlate.path}
            className={Styles.lead}
            aria-label={leadPlate.title}
          >
            {leadPlate.cover && (
              <GatsbyImage
                className={Styles.photo}
                image={leadPlate.cover.lead.gatsbyImageData}
                alt=""
                loading="eager"
              />
            )}
          </Link>
          <div className={Styles.side}>
            <div>
              <Display as="h1" size="page">
                <Lines lines={photography.heading} />
              </Display>
              <Body size="large" className={Styles.intro}>
                {photography.intro}
              </Body>
            </div>
            <div className={Styles.plates}>
              {plates.map((plate) => (
                <RowLink
                  key={plate.slug}
                  to={plate.path}
                  lead={plate.number}
                  mark={plate === leadPlate ? '●' : '→'}
                  isActive={plate === leadPlate}
                >
                  {plate.title}
                </RowLink>
              ))}
            </div>
          </div>
        </div>
        <div className={Styles.strip}>
          {otherPlates.map((plate) => (
            <Link key={plate.slug} to={plate.path} className={Styles.stripItem}>
              {plate.cover && (
                <GatsbyImage
                  className={Styles.photo}
                  image={plate.cover.tile.gatsbyImageData}
                  alt={plate.title}
                />
              )}
              <Label size="extraSmall">
                {plate.number} — {photography.open}
              </Label>
            </Link>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Photography;

export const Head = ({
  pageContext: { locale },
}: HeadProps<PhotographyData, LocalePageContext>) => (
  <SEO title={dictionaries[locale].photography.seoTitle} lang={locale} />
);

// One cover per gallery folder: the first file by name. The lead slot is a
// 4:5 frame up to 688px wide (half of the 1440px page minus gutters); strip
// tiles are squares that start at 132px and grow with the viewport.
export const pageQuery = graphql`
  query PhotographyCovers {
    allFile(
      filter: {
        extension: { eq: "webp" }
        sourceInstanceName: { eq: "photography" }
      }
      sort: { name: ASC }
    ) {
      group(field: { relativeDirectory: SELECT }, limit: 1) {
        fieldValue
        nodes {
          lead: childImageSharp {
            gatsbyImageData(
              width: 688
              aspectRatio: 0.8
              quality: 75
              layout: CONSTRAINED
            )
          }
          tile: childImageSharp {
            gatsbyImageData(
              width: 264
              aspectRatio: 1
              quality: 75
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;

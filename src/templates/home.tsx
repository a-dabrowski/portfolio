import React from 'react';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';

import { Button } from '../components/buttons';
import Contact from '../components/contact';
import Layout from '../components/layout';
import { Band, Container, RailSection, Rule } from '../components/section';
import SEO from '../components/seo';
import { TextTeaserRow } from '../components/textRow';
import { Tile, TileGrid } from '../components/tiles';
import {
  Accent,
  Body,
  Display,
  Heading,
  Label,
  Lines,
  Numeral,
} from '../components/typography';
import { dictionaries, padNumber, textsIndexPath } from '../i18n';
import { LocalePageContext, TextSummaryNode } from '../types';
import { listTexts, yearRange } from '../utils/texts';
import * as Styles from './home.module.scss';

interface HomeData {
  allMarkdownRemark: { nodes: TextSummaryNode[] };
}

// Row counts drawn in the design: four shortcuts in the hero tile, three
// rows in the teaser. The full list is on the texts index page.
const SHORTCUT_COUNT = 4;
const TEASER_COUNT = 3;

const Home = ({
  data,
  pageContext: { locale },
}: PageProps<HomeData, LocalePageContext>) => {
  const { site, nav, home, texts: textsCopy } = dictionaries[locale];
  const texts = listTexts(data.allMarkdownRemark.nodes, locale);

  return (
    <Layout locale={locale}>
      <Band
        start={
          <div className={Styles.kicker}>
            <Lines lines={home.kicker} />
            <Accent>.</Accent>
          </div>
        }
        end={
          <div className={Styles.forms}>
            {home.forms.map((form) => (
              <Label key={form}>
                <Accent>→</Accent> {form}
              </Label>
            ))}
          </div>
        }
      >
        <Display as="h1" size="hero" className={Styles.heroName}>
          {site.brand}
        </Display>
      </Band>

      <Container as="section">
        <Display as="div" size="giant" className={Styles.discipline}>
          {site.discipline}
        </Display>

        <TileGrid className={Styles.pitchGrid}>
          <Tile tone="ink" className={Styles.pitchTile}>
            <Body size="large">{home.intro}</Body>
            <div className={Styles.pitchFoot}>
              <Rule width={40} height={4} tone="accent" />
              <Label>{home.languages}</Label>
            </div>
          </Tile>
          <Tile tone="accent" className={Styles.pitchTile}>
            <Heading as="div" size="tile">
              <Lines lines={home.claim} />
            </Heading>
            <div className={Styles.claimFoot}>
              <Label isStrong>
                <Lines lines={home.claimNotes} />
              </Label>
              <span className={Styles.claimArrow}>↘</span>
            </div>
          </Tile>
          <Tile className={Styles.portrait}>
            <StaticImage
              className={Styles.portraitImage}
              src="../assets/images/adam.jpg"
              alt={home.portraitAlt}
              quality={75}
              width={560}
              loading="eager"
            />
          </Tile>
        </TileGrid>

        <TileGrid isJoined className={Styles.indexGrid}>
          <Tile className={Styles.indexTile}>
            <Numeral tone="accent">{padNumber(texts.length)}</Numeral>
            <Heading as="span" size="compact">
              <Lines lines={home.countLabel} />
            </Heading>
          </Tile>
          <Tile className={classNames(Styles.indexTile, Styles.indexList)}>
            {texts.slice(0, SHORTCUT_COUNT).map((text) => (
              <Link key={text.id} to={text.path} className={Styles.indexLink}>
                <span className={Styles.indexNumber}>{text.number}</span>
                <span>{text.frontmatter.title}</span>
              </Link>
            ))}
          </Tile>
          <Tile
            tone="ink"
            className={classNames(Styles.indexTile, Styles.booking)}
          >
            <Heading as="span" size="compact">
              <Lines lines={home.booking} />
            </Heading>
            <Button variant="primary" to="#contact" arrow="→">
              {home.bookingAction}
            </Button>
          </Tile>
        </TileGrid>
      </Container>

      <RailSection
        id="texts"
        rail={[nav.texts, yearRange(texts)].filter(Boolean).join(' — ')}
      >
        <div className={Styles.teaser}>
          <div className={Styles.teaserHead}>
            <Display>{textsCopy.heading}</Display>
            <Button
              variant="primary"
              to={textsIndexPath(locale)}
              arrow="→"
              className={Styles.teaserAction}
            >
              {textsCopy.openIndex}
            </Button>
          </div>
          <div className={Styles.teaserList}>
            {texts.slice(0, TEASER_COUNT).map((text) => (
              <TextTeaserRow key={text.id} text={text} />
            ))}
          </div>
        </div>
      </RailSection>

      <Contact />
    </Layout>
  );
};

export default Home;

export const Head = ({
  pageContext: { locale },
}: HeadProps<HomeData, LocalePageContext>) => (
  <SEO title={dictionaries[locale].home.seoTitle} lang={locale} />
);

export const pageQuery = graphql`
  query HomeTexts($locale: String!) {
    allMarkdownRemark(
      filter: { fields: { locale: { eq: $locale } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        ...TextSummary
      }
    }
  }
`;

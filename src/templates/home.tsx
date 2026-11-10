import React from 'react';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';

import { Button } from '../components/buttons';
import Contact from '../components/contact';
import Layout from '../components/layout';
import { Container, RailSection, Rule } from '../components/section';
import SEO from '../components/seo';
import TextCard from '../components/textCard/TextCard';
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
import { dictionaries, padNumber, textPath } from '../i18n';
import { LocalePageContext, TextSummaryNode } from '../types';
import * as Styles from './home.module.scss';

interface HomeData {
  allMarkdownRemark: { nodes: TextSummaryNode[] };
}

// The shortcut list in the hero is drawn for four rows in the design; the
// full list follows in the "texts" section.
const SHORTCUT_COUNT = 4;

const Home = ({
  data,
  pageContext: { locale },
}: PageProps<HomeData, LocalePageContext>) => {
  const { site, nav, home, texts: textsCopy } = dictionaries[locale];
  // Newest first. Numbers count from the oldest text, so they never change
  // when a new text is published.
  const texts = data.allMarkdownRemark.nodes.map((node, index, nodes) => ({
    ...node,
    number: padNumber(nodes.length - index),
    path: textPath(locale, node.fields.slug),
  }));
  const years = texts.map((text) => text.frontmatter.year);

  return (
    <Layout locale={locale}>
      <section className={Styles.hero}>
        <Container className={Styles.heroInner}>
          <div className={Styles.heroTop}>
            <div className={Styles.kicker}>
              <Lines lines={home.kicker} />
              <Accent>.</Accent>
            </div>
            <div className={Styles.heroLine}>
              <div className={Styles.heroLineRule} />
              <div className={Styles.heroLineDot} />
            </div>
            <div className={Styles.forms}>
              {home.forms.map((form) => (
                <Label key={form}>
                  <Accent>→</Accent> {form}
                </Label>
              ))}
            </div>
          </div>
          <Display as="h1" size="hero" className={Styles.heroName}>
            {site.brand}
          </Display>
        </Container>
      </section>

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
        rail={[
          nav.texts,
          // Oldest and newest publication year, e.g. "2024–2026".
          [...new Set([years[years.length - 1], years[0]])].join('–'),
        ]
          .filter(Boolean)
          .join(' — ')}
      >
        <div className={Styles.textsHead}>
          <Display>{textsCopy.heading}</Display>
          <div className={Styles.textsIntro}>
            <Rule />
            <Body size="large">{textsCopy.intro}</Body>
          </div>
        </div>
        <TileGrid minColumnWidth={380} lineTone="divider">
          {texts.map((text) => (
            <TextCard
              key={text.id}
              number={text.number}
              title={text.frontmatter.title}
              form={text.frontmatter.form}
              year={text.frontmatter.year}
              lede={text.frontmatter.lede}
              to={text.path}
              actionLabel={textsCopy.readAction}
            />
          ))}
        </TileGrid>
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
        id
        fields {
          slug
        }
        frontmatter {
          title
          year: date(formatString: "YYYY")
          form
          lede
        }
      }
    }
  }
`;

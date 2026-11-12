import React, { useState } from 'react';
import { graphql, HeadProps, Link, navigate, PageProps } from 'gatsby';

import { Button, Toggle } from '../components/buttons';
import Layout from '../components/layout';
import { Band, Container } from '../components/section';
import SEO from '../components/seo';
import { TextRow } from '../components/textRow';
import { Display, Label, Lines, Numeral } from '../components/typography';
import { dictionaries, localizedPath, padNumber } from '../i18n';
import { LocalePageContext, TextSummaryNode } from '../types';
import { listTexts, yearRange } from '../utils/texts';
import * as Styles from './texts.module.scss';

interface TextsData {
  allMarkdownRemark: { nodes: TextSummaryNode[] };
}

const TextsIndex = ({
  data,
  pageContext: { locale },
}: PageProps<TextsData, LocalePageContext>) => {
  const { texts: copy } = dictionaries[locale];
  const texts = listTexts(data.allMarkdownRemark.nodes, locale);
  // null shows every form.
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const withForm = (form: string | null) =>
    form === null
      ? texts
      : texts.filter((text) => text.frontmatter.form === form);
  const forms = [
    null,
    ...new Set(
      texts.flatMap((text) =>
        text.frontmatter.form === null ? [] : [text.frontmatter.form]
      )
    ),
  ];

  return (
    <Layout locale={locale}>
      <Band
        start={
          <Label isStrong>
            <Link to={localizedPath(locale, '/')} className={Styles.back}>
              ← {copy.home}
            </Link>
          </Label>
        }
        end={
          <Label className={Styles.rail}>
            {[copy.indexRail, yearRange(texts)].filter(Boolean).join(' — ')}
          </Label>
        }
      >
        <div className={Styles.title}>
          <Display as="h1" size="index" className={Styles.heading}>
            {copy.indexHeading}
          </Display>
          <div className={Styles.count}>
            <Numeral size="count" tone="accent">
              {padNumber(texts.length)}
            </Numeral>
            <Label size="extraSmall" className={Styles.tagline}>
              <Lines lines={copy.tagline} />
            </Label>
          </div>
        </div>
      </Band>

      <div className={Styles.filterBar}>
        <Container className={Styles.filters}>
          <Label size="extraSmall" isStrong className={Styles.filterLabel}>
            {copy.filter}
          </Label>
          {forms.map((form) => (
            <Toggle
              key={form ?? copy.allForms}
              isPressed={form === activeForm}
              onClick={() => setActiveForm(form)}
              detail={withForm(form).length}
            >
              {form ?? copy.allForms}
            </Toggle>
          ))}
          <Button
            className={Styles.random}
            onClick={() =>
              navigate(texts[Math.floor(Math.random() * texts.length)].path)
            }
            disabled={texts.length === 0}
          >
            {copy.random} ↻
          </Button>
        </Container>
      </div>

      <Container className={Styles.list}>
        {withForm(activeForm).map((text) => (
          <TextRow key={text.id} text={text} />
        ))}
      </Container>
    </Layout>
  );
};

export default TextsIndex;

export const Head = ({
  pageContext: { locale },
}: HeadProps<TextsData, LocalePageContext>) => (
  <SEO title={dictionaries[locale].texts.seoTitle} lang={locale} />
);

// TextSummary is shared with the home page teaser (src/templates/home.tsx).
export const pageQuery = graphql`
  fragment TextSummary on MarkdownRemark {
    id
    timeToRead
    fields {
      slug
    }
    frontmatter {
      title
      year: date(formatString: "YYYY")
      form
      dek
      stamp
      scale
    }
  }

  query TextsIndex($locale: String!) {
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

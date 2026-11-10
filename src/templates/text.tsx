import React, { useEffect } from 'react';
import { graphql, HeadProps, navigate, PageProps } from 'gatsby';

import {
  AbsurdityScale,
  ArticleHero,
  ArticleStrip,
  Footnotes,
  NextText,
  Prose,
  splitFootnotes,
} from '../components/article';
import { Button } from '../components/buttons';
import Layout from '../components/layout';
import { Container } from '../components/section';
import SEO from '../components/seo';
import { Label } from '../components/typography';
import { dictionaries, format, localizedPath, padNumber } from '../i18n';
import { LocalePageContext, TextFrontmatter } from '../types';
import * as Styles from './text.module.scss';

interface TextData {
  markdownRemark: {
    html: string;
    excerpt: string;
    timeToRead: number;
    frontmatter: TextFrontmatter;
  };
}

interface TextContext extends LocalePageContext {
  id: string;
  number: number;
  count: number;
  previousPath: string;
  next: { path: string; title: string; number: number };
}

const TextTemplate = ({
  data,
  pageContext: { locale, number, count, previousPath, next },
}: PageProps<TextData, TextContext>) => {
  const { article } = dictionaries[locale];
  const { html, timeToRead, frontmatter } = data.markdownRemark;
  const { body, footnotes } = splitFootnotes(html);

  // Left and right arrow keys page through the texts.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        navigate(next.path);
      }
      if (event.key === 'ArrowLeft') {
        navigate(previousPath);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next.path, previousPath]);

  return (
    <Layout locale={locale}>
      <Container className={Styles.bar}>
        <Button
          variant="ghost"
          to={localizedPath(locale, '/#texts')}
          className={Styles.back}
        >
          ← {article.back}
        </Button>
        <div className={Styles.pager}>
          <Label className={Styles.position}>
            {format(article.position, {
              number: padNumber(number),
              count: padNumber(count),
            })}
          </Label>
          <Button
            isIcon
            to={previousPath}
            rel="prev"
            aria-label={article.previous}
          >
            ←
          </Button>
          <Button isIcon to={next.path} rel="next" aria-label={article.next}>
            →
          </Button>
        </div>
      </Container>

      <ArticleHero
        number={padNumber(number)}
        title={frontmatter.title}
        metaLines={[
          [frontmatter.form, frontmatter.year].filter(Boolean).join(' — '),
          article.filedBy,
        ]}
        dek={frontmatter.dek}
        stamp={frontmatter.stamp}
      />
      <ArticleStrip
        start={[article.dateline, frontmatter.dateline]
          .filter(Boolean)
          .join(' — ')}
        end={format(article.readingTime, { minutes: timeToRead })}
      />
      {frontmatter.scale !== null && (
        <AbsurdityScale
          value={frontmatter.scale}
          lowLabel={article.scaleLow}
          highLabel={article.scaleHigh}
          markerLabel={article.scaleMarker}
        />
      )}

      <Prose html={body} endLabel={article.end} />
      {footnotes && <Footnotes heading={article.footnotes} html={footnotes} />}

      <NextText
        to={next.path}
        label={`${article.next} — ${padNumber(next.number)}`}
        title={next.title}
      />
    </Layout>
  );
};

export default TextTemplate;

export const Head = ({
  data,
  pageContext: { locale },
}: HeadProps<TextData, TextContext>) => (
  <SEO
    title={data.markdownRemark.frontmatter.title}
    description={
      data.markdownRemark.frontmatter.lede || data.markdownRemark.excerpt
    }
    lang={locale}
  />
);

export const pageQuery = graphql`
  query TextById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        title
        year: date(formatString: "YYYY")
        form
        stamp
        scale
        dateline
        dek
        lede
      }
    }
  }
`;

import React from 'react';
import { Link } from 'gatsby';

import { Container } from '../section';
import { Accent, Display, Label, Numeral } from '../typography';
import * as Styles from './Article.module.scss';

interface ArticleHeroProps {
  number: string;
  title: string;
  // Two short metadata lines above the rule ("Bit — 2026", "Spisał …").
  metaLines: string[];
  dek?: string | null;
  stamp?: string | null;
}

export const ArticleHero = ({
  number,
  title,
  metaLines,
  dek,
  stamp,
}: ArticleHeroProps) => (
  <section className={Styles.hero}>
    <Container className={Styles.heroInner}>
      <div className={Styles.heroMeta}>
        <div className={Styles.heroMetaLines}>
          {metaLines.map((line) => (
            <Label key={line} isStrong>
              {line}
            </Label>
          ))}
        </div>
        <Numeral size="large">{number}</Numeral>
      </div>
      <Display as="h1" size="article" className={Styles.heroTitle}>
        {title}
      </Display>
      <div className={Styles.heroFoot}>
        {dek && <p className={Styles.dek}>{dek}</p>}
        {stamp && <div className={Styles.stamp}>✕ {stamp}</div>}
      </div>
    </Container>
  </section>
);

interface ArticleStripProps {
  start: string;
  end: string;
}

// Dark band under the hero: dateline on the left, reading time on the right.
export const ArticleStrip = ({ start, end }: ArticleStripProps) => (
  <div className={Styles.strip}>
    <Container className={Styles.stripRow}>
      <span>{start}</span>
      <span>
        <Accent>●</Accent> {end}
      </span>
    </Container>
  </div>
);

interface AbsurdityScaleProps {
  // 0 = fully serious, 1 = fully absurd.
  value: number;
  lowLabel: string;
  highLabel: string;
  markerLabel: string;
}

export const AbsurdityScale = ({
  value,
  lowLabel,
  highLabel,
  markerLabel,
}: AbsurdityScaleProps) => {
  const left = `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%`;

  return (
    <Container className={Styles.scale}>
      <div className={Styles.scaleLabels}>
        <Label size="extraSmall" isStrong>
          {lowLabel}
        </Label>
        <Label size="extraSmall" isStrong>
          {highLabel}
        </Label>
      </div>
      <div className={Styles.scaleTrack}>
        <div className={Styles.scaleKnob} style={{ left }} />
      </div>
      <div className={Styles.scaleMarkerRow}>
        <span className={Styles.scaleMarker} style={{ left }}>
          <Label size="extraSmall" tone="accentDark">
            ↑ {markerLabel}
          </Label>
        </span>
      </div>
    </Container>
  );
};

// gatsby-transformer-remark appends footnotes to the article HTML as one
// trailing block; the design shows them in their own section.
const FOOTNOTES_OPENING_TAG = '<div class="footnotes">';

export const splitFootnotes = (
  html: string
): { body: string; footnotes: string | null } => {
  const index = html.lastIndexOf(FOOTNOTES_OPENING_TAG);
  return index === -1
    ? { body: html, footnotes: null }
    : { body: html.slice(0, index), footnotes: html.slice(index) };
};

interface ProseProps {
  // Article HTML rendered from markdown at build time.
  html: string;
  endLabel: string;
}

// Styles every markdown construct of a text; the syntax is listed under
// "Writing a text" in CLAUDE.md.
export const Prose = ({ html, endLabel }: ProseProps) => (
  <article className={Styles.body}>
    <div className={Styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
    <div className={Styles.endMark}>
      <Label isStrong className={Styles.endMarkText}>
        <span className={Styles.endMarkSquare} />
        {endLabel}
      </Label>
    </div>
  </article>
);

interface FootnotesProps {
  heading: string;
  html: string;
}

export const Footnotes = ({ heading, html }: FootnotesProps) => (
  <section className={Styles.footnotes}>
    <div className={Styles.footnotesInner}>
      <Label as="h2" isStrong>
        {heading}
      </Label>
      <div
        className={Styles.footnotesList}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  </section>
);

interface NextTextProps {
  to: string;
  label: string;
  title: string;
}

export const NextText = ({ to, label, title }: NextTextProps) => (
  <Link to={to} rel="next" className={Styles.next}>
    <Container className={Styles.nextInner}>
      <div>
        <Label isStrong className={Styles.nextLabel}>
          {label}
        </Label>
        <Display as="div" size="next">
          {title}
        </Display>
      </div>
      <span className={Styles.nextArrow}>→</span>
    </Container>
  </Link>
);

import React from 'react';
import { Link } from 'gatsby';

import { format, useDictionary } from '../../i18n';
import { ListedText } from '../../types';
import { scalePercent } from '../../utils/texts';
import { Display, Heading, Label, Numeral } from '../typography';
import * as Styles from './TextRow.module.scss';

interface TextRowProps {
  text: ListedText;
}

const formAndYear = ({ frontmatter }: ListedText): string =>
  [frontmatter.form, frontmatter.year].filter(Boolean).join(' — ');

// One text in the texts index: number, title, dek, metadata and scale.
export const TextRow = ({ text }: TextRowProps) => {
  const { texts: copy } = useDictionary();
  const { title, dek, stamp, scale } = text.frontmatter;

  return (
    <Link to={text.path} className={Styles.row}>
      <Numeral size="row" tone="accent" className={Styles.number}>
        {text.number}
      </Numeral>
      <span className={Styles.main}>
        <Display as="span" size="row">
          {title}
        </Display>
        {dek && <span className={Styles.dek}>{dek}</span>}
      </span>
      <span className={Styles.meta}>
        <Label size="extraSmall" isStrong>
          {formAndYear(text)} ·{' '}
          {format(copy.minutes, { minutes: text.timeToRead })}
        </Label>
        {scale !== null && (
          <Label size="extraSmall" className={Styles.scale}>
            <span>{copy.scaleLow}</span>
            <span className={Styles.scaleTrack}>
              <span
                className={Styles.scaleKnob}
                style={{ left: scalePercent(scale) }}
              />
            </span>
            <span>{copy.scaleHigh}</span>
          </Label>
        )}
        {stamp && <Label size="extraSmall">✕ {stamp}</Label>}
      </span>
      <span className={Styles.arrow}>→</span>
    </Link>
  );
};

// Compact row for the home page teaser.
export const TextTeaserRow = ({ text }: TextRowProps) => (
  <Link to={text.path} className={Styles.teaser}>
    <span className={Styles.teaserNumber}>{text.number}</span>
    <Heading as="span" size="row" className={Styles.teaserTitle}>
      {text.frontmatter.title}
    </Heading>
    <Label size="extraSmall" className={Styles.teaserMeta}>
      {formAndYear(text)} →
    </Label>
  </Link>
);

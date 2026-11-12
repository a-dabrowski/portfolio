import React from 'react';
import classNames from 'classnames';

import * as Styles from './Typography.module.scss';

interface TypographyProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

type Tone = 'muted' | 'accent' | 'accentDark';

const toneClasses: Record<Tone, string> = {
  muted: Styles.muted,
  accent: Styles.accent,
  accentDark: Styles.accentDark,
};

type DisplaySize =
  | 'hero'
  | 'giant'
  | 'index'
  | 'row'
  | 'section'
  | 'contact'
  | 'page'
  | 'article'
  | 'next';

const displayClasses: Record<DisplaySize, string> = {
  hero: Styles.displayHero,
  giant: Styles.displayGiant,
  index: Styles.displayIndex,
  row: Styles.displayRow,
  section: Styles.displaySection,
  contact: Styles.displayContact,
  page: Styles.displayPage,
  article: Styles.displayArticle,
  next: Styles.displayNext,
};

// Condensed, uppercase poster type: page and section titles.
export const Display = ({
  as: Tag = 'h2',
  size = 'section',
  className,
  children,
}: TypographyProps & { size?: DisplaySize }) => (
  <Tag className={classNames(Styles.display, displayClasses[size], className)}>
    {children}
  </Tag>
);

type HeadingSize = 'card' | 'tile' | 'row' | 'compact';

const headingClasses: Record<HeadingSize, string> = {
  card: Styles.headingCard,
  tile: Styles.headingTile,
  row: Styles.headingRow,
  compact: Styles.headingCompact,
};

// Uppercase titles inside cards and tiles.
export const Heading = ({
  as: Tag = 'h3',
  size = 'card',
  className,
  children,
}: TypographyProps & { size?: HeadingSize }) => (
  <Tag className={classNames(Styles.heading, headingClasses[size], className)}>
    {children}
  </Tag>
);

type NumeralSize = 'small' | 'medium' | 'large' | 'count' | 'row' | 'season';

const numeralClasses: Record<NumeralSize, string> = {
  small: Styles.numeralSmall,
  medium: Styles.numeralMedium,
  large: Styles.numeralLarge,
  count: Styles.numeralCount,
  row: Styles.numeralRow,
  season: Styles.numeralSeason,
};

// Condensed figures: text numbers, counters, the season.
export const Numeral = ({
  as: Tag = 'span',
  size = 'medium',
  tone,
  className,
  children,
}: TypographyProps & { size?: NumeralSize; tone?: Tone }) => (
  <Tag
    className={classNames(
      Styles.numeral,
      numeralClasses[size],
      tone && toneClasses[tone],
      className
    )}
  >
    {children}
  </Tag>
);

type LabelSize = 'extraSmall' | 'small' | 'medium';

const labelClasses: Record<LabelSize, string> = {
  extraSmall: Styles.labelExtraSmall,
  small: Styles.labelSmall,
  medium: Styles.labelMedium,
};

// Small, letter-spaced, uppercase captions and metadata.
export const Label = ({
  as: Tag = 'span',
  size = 'small',
  tone,
  isStrong = false,
  className,
  children,
}: TypographyProps & { size?: LabelSize; tone?: Tone; isStrong?: boolean }) => (
  <Tag
    className={classNames(
      Styles.label,
      labelClasses[size],
      tone && toneClasses[tone],
      isStrong && Styles.strong,
      className
    )}
  >
    {children}
  </Tag>
);

type BodySize = 'small' | 'medium' | 'large';

const bodyClasses: Record<BodySize, string> = {
  small: Styles.bodySmall,
  medium: Styles.bodyMedium,
  large: Styles.bodyLarge,
};

// Running text outside of articles (articles use Prose).
export const Body = ({
  as: Tag = 'p',
  size = 'small',
  className,
  children,
}: TypographyProps & { size?: BodySize }) => (
  <Tag className={classNames(Styles.body, bodyClasses[size], className)}>
    {children}
  </Tag>
);

// Accent-coloured inline mark: the full stop, arrows and bullets.
export const Accent = ({ children }: { children: React.ReactNode }) => (
  <span className={Styles.accent}>{children}</span>
);

// Renders dictionary line arrays ("Teksty", "do czytania") with line breaks.
export const Lines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line, index) => (
      <React.Fragment key={line}>
        {index > 0 && <br />}
        {line}
      </React.Fragment>
    ))}
  </>
);

import { padNumber, textPath } from '../i18n';
import { ListedText, TextSummaryNode } from '../types';

// Takes texts sorted newest first. Numbers count from the oldest text, so a
// text keeps its number when a newer one is published.
export const listTexts = (
  nodes: TextSummaryNode[],
  locale: string
): ListedText[] =>
  nodes.map((node, index) => ({
    ...node,
    number: padNumber(nodes.length - index),
    path: textPath(locale, node.fields.slug),
  }));

// "2024–2026" for texts sorted newest first; a single year when they match.
export const yearRange = (texts: TextSummaryNode[]): string =>
  texts.length === 0
    ? ''
    : [
        ...new Set([
          texts[texts.length - 1].frontmatter.year,
          texts[0].frontmatter.year,
        ]),
      ].join('–');

// Inner HTML of the first pull quote (`> quote`) in a rendered text, used by
// the short form. Margin notes (`>> note`) render as <aside>, so they never
// match.
export const firstPullQuote = (html: string): string | null =>
  html.match(/<blockquote>\s*<p>([\s\S]*?)<\/p>/)?.[1] ?? null;

// Position on the serious–absurd scale as a CSS percentage; `scale` is 0–1
// in the frontmatter and is clamped to that range.
export const scalePercent = (scale: number): string =>
  `${Math.round(Math.min(1, Math.max(0, scale)) * 100)}%`;

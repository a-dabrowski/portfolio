import React, { useState } from 'react';

import {
  AbsurdityScale,
  ArticleHero,
  ArticleStrip,
  Footnotes,
  NextText,
  Prose,
  ShortForm,
} from '../components/article';
import { Button, Toggle, ToggleGroup } from '../components/buttons';
import Contact from '../components/contact';
import Layout from '../components/layout';
import { ArrowLink, RowLink, SmartLink } from '../components/links';
import Newsboard from '../components/newsboard';
import { Band, Container, RailSection, Rule } from '../components/section';
import SEO from '../components/seo';
import { TextRow, TextTeaserRow } from '../components/textRow';
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
import { ListedText } from '../types';
import * as Styles from './styleguide.module.scss';

// Reference page for whoever builds or edits a page: every primitive of the
// design system, rendered live, each under a tag with the code that produces
// it. The sample copy is fixed English/Polish on purpose; this page is not
// part of the translated site and is hidden from search engines.

interface SpecimenProps {
  // The JSX (or markdown) that produces the example below the tag.
  code: string;
  // When to use it, or where the site already uses it.
  note?: string;
  // For components that bring their own page-width container.
  isFullWidth?: boolean;
  children: React.ReactNode;
}

const Specimen = ({
  code,
  note,
  isFullWidth = false,
  children,
}: SpecimenProps) => (
  <div className={Styles.specimen}>
    <Container className={Styles.tag}>
      <code className={Styles.code}>{code}</code>
      {note && <span className={Styles.note}>{note}</span>}
    </Container>
    {isFullWidth ? children : <Container>{children}</Container>}
  </div>
);

interface GroupProps {
  id: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}

const Group = ({ id, title, summary, children }: GroupProps) => (
  <section id={id} className={Styles.group}>
    <Container className={Styles.groupHead}>
      <Display size="page">{title}</Display>
      <Body size="large" className={Styles.summary}>
        {summary}
      </Body>
    </Container>
    {children}
  </section>
);

const GROUPS = [
  { id: 'typography', title: 'Typography' },
  { id: 'links', title: 'Links' },
  { id: 'buttons', title: 'Buttons' },
  { id: 'layout', title: 'Layout' },
  { id: 'lists', title: 'Lists' },
  { id: 'article', title: 'Article' },
];

const SAMPLE_TEXT: ListedText = {
  id: 'sample',
  timeToRead: 3,
  number: '04',
  path: '#lists',
  fields: { slug: 'sample' },
  frontmatter: {
    title: 'Tramwaj to parlament',
    year: '2026',
    form: 'Bit',
    dek: 'Raport terenowy z jedenastu lat niesiadania.',
    stamp: 'Nie sprawdzono faktów',
    scale: 0.58,
  },
};

const SAMPLE_NEWS = [
  {
    date: '2999-12-05',
    title: 'Open mic',
    tag: 'Występ',
    place: 'Warszawa',
    note: 'Start 20:00',
  },
  { date: '2026-03-14', title: 'Nowy tekst', tag: 'Tekst', href: '#lists' },
];

// What gatsby-transformer-remark produces for a text that uses every
// markdown element (the figure is left out: it needs a processed image).
const SAMPLE_PROSE = `
<p>Pierwszy akapit dostaje inicjał. Dalej <del>skreślenie</del>, <em>zakreślacz</em>, <strong>pogrubienie</strong>, <span class="text-redacted" tabindex="0">zaczernienie</span> i przypis.<sup><a href="#styleguide-footnote">1</a></sup></p>
<aside class="text-note"><p>Notatka na marginesie.</p></aside>
<p>Akapit, obok którego stoi notatka z marginesu. Zwykły tekst biegnie w kolumnie o szerokości 680 pikseli.</p>
<p class="text-stage">[Długa pauza.]</p>
<blockquote><p>Uprzejmość to tchórzostwo z dobrą postawą.</p></blockquote>
<h2>Śródtytuł</h2>
<ul><li>Punkt listy.</li><li>Drugi punkt.</li></ul>
`;

const SAMPLE_FOOTNOTES = `
<div class="footnotes"><hr><ol><li id="styleguide-footnote"><p>Treść przypisu. <a href="#article" class="footnote-backref">↩</a></p></li></ol></div>
`;

const PROSE_SYNTAX = [
  ['first paragraph', 'large red initial (automatic)'],
  ['~~text~~', 'strike-through'],
  ['*text*', 'highlighter'],
  ['**text**', 'bold'],
  ['||text||', 'redaction, readable on hover'],
  ['[^1]', 'footnote marker'],
  ['>> text', 'margin note next to the following paragraph'],
  ['[text] as a whole paragraph', 'stage direction'],
  ['> text', 'pull quote'],
  ['## text', 'section heading'],
  ['- text', 'list'],
];

const ToggleDemo = () => {
  const [activeForm, setActiveForm] = useState('Bit');

  return (
    <ToggleGroup label="Form">
      {['Bit', 'Monolog', 'Felieton'].map((form, index) => (
        <Toggle
          key={form}
          isPressed={form === activeForm}
          onClick={() => setActiveForm(form)}
          detail={index + 1}
        >
          {form}
        </Toggle>
      ))}
    </ToggleGroup>
  );
};

const Styleguide = () => (
  <Layout>
    <Container className={Styles.intro}>
      <Label isStrong>Design system v2</Label>
      <Display as="h1" size="page">
        Styleguide
      </Display>
      <Body size="large" className={Styles.summary}>
        Every building block of the site, rendered live. The dark tag above each
        example is the code that produces it; the grey text says when to use it.
        Copy the tag, change the content.
      </Body>
      <nav className={Styles.contents}>
        {GROUPS.map((group) => (
          <ArrowLink key={group.id} to={`#${group.id}`}>
            {group.title}
          </ArrowLink>
        ))}
      </nav>
    </Container>

    <Group
      id="typography"
      title="Typography"
      summary="Five text components cover all type on the site. Pick by role, then by size. Import from components/typography."
    >
      {(
        [
          ['hero', 'Home page name'],
          ['giant', 'Home page discipline line'],
          ['index', 'Title of an index page (/texts/)'],
          ['contact', 'Contact section heading'],
          ['page', 'Title of a standalone page'],
          ['article', 'Title of a text'],
          ['section', 'Section heading (default size)'],
          ['next', 'Title in the "next text" band'],
          ['row', 'Title inside a list row'],
        ] as const
      ).map(([size, note]) => (
        <Specimen key={size} code={`<Display size="${size}">`} note={note}>
          <Display as="div" size={size}>
            Display
          </Display>
        </Specimen>
      ))}

      {(
        [
          ['tile', 'Statement inside a tile'],
          ['row', 'Title of a compact row'],
          ['card', 'Card title (default size)'],
          ['compact', 'Caption next to a numeral'],
        ] as const
      ).map(([size, note]) => (
        <Specimen key={size} code={`<Heading size="${size}">`} note={note}>
          <Heading as="div" size={size}>
            Heading {size}
          </Heading>
        </Specimen>
      ))}

      <Specimen
        code={'<Numeral size="…" tone="accent">'}
        note="Condensed figures: text numbers, counters, dates. Sizes left to right: large, count, medium, row, small, date, season."
      >
        <div className={Styles.inline}>
          {(
            [
              'large',
              'count',
              'medium',
              'row',
              'small',
              'date',
              'season',
            ] as const
          ).map((size, index) => (
            <Numeral
              key={size}
              size={size}
              tone={index % 2 === 0 ? 'accent' : undefined}
            >
              04
            </Numeral>
          ))}
        </div>
      </Specimen>

      <Specimen
        code={'<Label size="…" tone="…" isStrong>'}
        note="Small uppercase captions and metadata."
      >
        <div className={Styles.stack}>
          <Label size="medium">size="medium"</Label>
          <Label>size="small" (default)</Label>
          <Label size="extraSmall">size="extraSmall"</Label>
          <Label isStrong>isStrong</Label>
          <Label tone="muted">tone="muted"</Label>
          <Label tone="accent">tone="accent"</Label>
          <Label tone="accentDark">tone="accentDark"</Label>
        </div>
      </Specimen>

      <Specimen
        code={'<Body size="…">'}
        note="Running text outside of articles. large = intros, medium = descriptions, small = fine print (default)."
      >
        <div className={Styles.stack}>
          <Body size="large">
            size="large" — Między występami: portrety, plenery i studio.
          </Body>
          <Body size="medium">
            size="medium" — Między występami: portrety, plenery i studio.
          </Body>
          <Body>
            size="small" — Między występami: portrety, plenery i studio.
          </Body>
        </div>
      </Specimen>

      <Specimen
        code={'<Accent>.</Accent>'}
        note="Colours one inline mark: a full stop, an arrow, a bullet."
      >
        <Heading as="div">
          Zdania<Accent>.</Accent> <Accent>→</Accent> Dalej
        </Heading>
      </Specimen>

      <Specimen
        code={'<Lines lines={["Pisane powoli.", "Mówione raz."]} />'}
        note="Renders an array from the dictionary JSON as lines with breaks."
      >
        <Label isStrong>
          <Lines lines={['Pisane powoli.', 'Mówione raz.']} />
        </Label>
      </Specimen>
    </Group>

    <Group
      id="links"
      title="Links"
      summary="All links go through SmartLink, which picks the router for site paths, a new tab for web addresses and a plain anchor for mailto: and #anchors. Import from components/links."
    >
      <Specimen
        code={'<ArrowLink to="/texts/">'}
        note="Navigation link, as in the header."
      >
        <ArrowLink to="#links">Teksty</ArrowLink>
      </Specimen>

      <Specimen
        code={'<RowLink to="…" eyebrow="Występy">'}
        note="Tall row with a caption above the value. Contact rows."
      >
        <RowLink to="#links" eyebrow="Występy">
          adres@example.com
        </RowLink>
      </Specimen>

      <Specimen
        code={'<RowLink to="…" lead="Nr 01" isActive>'}
        note="Compact row with a leading cell. Gallery list; isActive marks the current one."
      >
        <RowLink to="#links" lead="Nr 01" isActive>
          Portret
        </RowLink>
        <RowLink to="#links" lead="Nr 02">
          Plener
        </RowLink>
      </Specimen>

      <Specimen
        code={'<SmartLink to="…" className="…">'}
        note="Unstyled. Use it when a whole custom block must be a link."
      >
        <SmartLink to="#links">A plain link with the base link style</SmartLink>
      </Specimen>
    </Group>

    <Group
      id="buttons"
      title="Buttons"
      summary="Button is an action or, with `to`, a link that looks like one. Toggle is a two-state switch. Import from components/buttons."
    >
      <Specimen
        code={'<Button variant="primary | secondary | ghost">'}
        note="primary = the one main action of a section. secondary = default. ghost = low-key, e.g. a back link."
      >
        <div className={Styles.inline}>
          <Button variant="primary">Primary</Button>
          <Button>Secondary</Button>
          <Button variant="ghost">← Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Specimen>

      <Specimen
        code={'<Button variant="primary" to="/texts/" arrow="→">'}
        note="`to` renders a link. `arrow` pushes a trailing mark to the right edge; give the button a min-width."
      >
        <Button
          variant="primary"
          to="#buttons"
          arrow="→"
          className={Styles.wideButton}
        >
          Otwórz spis
        </Button>
      </Specimen>

      <Specimen
        code={'<Button isIcon aria-label="Następny tekst">'}
        note="Square button for a single glyph. Always add aria-label."
      >
        <div className={Styles.inline}>
          <Button isIcon aria-label="Previous">
            ←
          </Button>
          <Button isIcon aria-label="Next">
            →
          </Button>
        </div>
      </Specimen>

      <Specimen
        code={'<ToggleGroup label="…"><Toggle isPressed onClick detail={2}>'}
        note="Filter chips and the long/short switch. `detail` is the lighter text after the label. Click to try."
      >
        <ToggleDemo />
      </Specimen>
    </Group>

    <Group
      id="layout"
      title="Layout"
      summary="Blocks that give a page its structure. Import from components/section and components/tiles."
    >
      <Specimen
        code={'<Container>'}
        note="Centres content at the page width with the side gutter. The outline below is added for this demo."
      >
        <div className={Styles.outline}>
          <Label>Content at page width</Label>
        </div>
      </Specimen>

      <Specimen
        isFullWidth
        code={'<Band start={…} end={…}>'}
        note="Dark page header: a meta row joined by a rule and a dot, then the poster title as children."
      >
        <Band start={<Label isStrong>start</Label>} end={<Label>end</Label>}>
          <Display as="div" size="index">
            Children
          </Display>
        </Band>
      </Specimen>

      <Specimen
        isFullWidth
        code={'<RailSection id="…" rail="Teksty — 2024–2026">'}
        note='Page section with a top rule and a vertical caption on the left. railAlign="end" moves the caption to the bottom.'
      >
        <RailSection rail="Rail caption — 2026">
          <Display>Section content</Display>
        </RailSection>
      </Specimen>

      <Specimen
        code={'<Rule width={40} height={4} tone="accent" />'}
        note="Short bar used as a visual full stop above an intro or caption. Default: 28 × 2, ink."
      >
        <div className={Styles.stack}>
          <Rule />
          <Rule width={40} height={4} tone="accent" />
        </div>
      </Specimen>

      <Specimen
        code={'<TileGrid><Tile tone="ink | accent | paper">'}
        note="Grid that drops columns as the screen narrows. minColumnWidth (default 240) sets when."
      >
        <TileGrid>
          <Tile tone="ink">
            <Heading as="div">tone="ink"</Heading>
          </Tile>
          <Tile tone="accent">
            <Heading as="div">tone="accent"</Heading>
          </Tile>
          <Tile>
            <Heading as="div">tone="paper" (default)</Heading>
          </Tile>
        </TileGrid>
      </Specimen>

      <Specimen
        code={'<TileGrid isJoined lineTone="ink | divider">'}
        note="isJoined removes the gaps and draws rules between tiles instead."
      >
        <TileGrid isJoined>
          <Tile>
            <Numeral tone="accent">04</Numeral>
          </Tile>
          <Tile>
            <Heading as="div" size="compact">
              Joined tiles share their rules
            </Heading>
          </Tile>
          <Tile tone="ink">
            <Heading as="div" size="compact">
              tone="ink"
            </Heading>
          </Tile>
        </TileGrid>
      </Specimen>
    </Group>

    <Group
      id="lists"
      title="Lists"
      summary="Ready-made rows and sections fed by content files. They need data, not markup."
    >
      <Specimen
        code={'<TextRow text={text} />'}
        note="One text on /texts/. Dek, stamp and scale appear only when the text has them."
      >
        <TextRow text={SAMPLE_TEXT} />
      </Specimen>

      <Specimen
        code={'<TextTeaserRow text={text} />'}
        note="Compact row for the home page teaser."
      >
        <TextTeaserRow text={SAMPLE_TEXT} />
      </Specimen>

      <Specimen
        isFullWidth
        code={'<Newsboard entries={…} buildDate="…" />'}
        note="Home page board fed by content/news/pl.json. Dates after today go left, the rest right. A row with href is a link."
      >
        <Newsboard entries={SAMPLE_NEWS} buildDate="2026-11-20" />
      </Specimen>

      <Specimen
        isFullWidth
        code={'<Contact />'}
        note="Booking section. Heading, intro and rows come from the contact block of content/i18n/pl.json."
      >
        <Contact />
      </Specimen>
    </Group>

    <Group
      id="article"
      title="Article"
      summary="The parts of a text page. They are filled from a markdown file; docs/writing-texts.md lists every field and syntax. Import from components/article."
    >
      <Specimen
        isFullWidth
        code={'<ArticleHero number title metaLines dek stamp />'}
        note="From the header fields title, form, date, dek and stamp. Dek and stamp are optional."
      >
        <ArticleHero
          number="04"
          title="Tramwaj to parlament"
          metaLines={['Bit — 2026', 'metaLines[1]']}
          dek="dek: Raport terenowy z jedenastu lat niesiadania."
          stamp="stamp"
        />
      </Specimen>

      <Specimen
        isFullWidth
        code={'<ArticleStrip start="…" end="…" />'}
        note="Dark strip under the hero: dateline on the left, reading time on the right."
      >
        <ArticleStrip
          start="start — dateline: Warszawa — Tramwaj 17 — 07:42"
          end="end — 3 min czytania"
        />
      </Specimen>

      <Specimen
        code={'<AbsurdityScale value={0.58} lowLabel highLabel markerLabel />'}
        note="From the header field scale: 0 = far left, 1 = far right."
      >
        <AbsurdityScale
          value={0.58}
          lowLabel="lowLabel"
          highLabel="highLabel"
          markerLabel="markerLabel · value 0.58"
        />
      </Specimen>

      <Specimen
        code={'<Prose html={html} endLabel="…" />'}
        note="Styles the markdown body. Each line of the key below is one element of the example, in order."
      >
        <ol className={Styles.syntax}>
          {PROSE_SYNTAX.map(([syntax, result]) => (
            <li key={syntax}>
              <code className={Styles.code}>{syntax}</code>
              <span className={Styles.note}>{result}</span>
            </li>
          ))}
        </ol>
        <Prose html={SAMPLE_PROSE} endLabel="endLabel" />
      </Specimen>

      <Specimen
        isFullWidth
        code={'<Footnotes heading="…" html={footnotes} />'}
        note="The [^1]: definitions of a text, split off the body with splitFootnotes(html)."
      >
        <Footnotes heading="heading" html={SAMPLE_FOOTNOTES} />
      </Specimen>

      <Specimen
        code={'<ShortForm tagline lede quoteHtml endLabel longFormLabel />'}
        note="One-paragraph version of a text: the lede field plus the first pull quote."
      >
        <ShortForm
          tagline={['tagline[0]', 'tagline[1]']}
          lede="Lede. Każdy warszawski tramwaj to mały parlament. Nikogo nie wybrano, każdy ma zdanie."
          quoteHtml="quoteHtml: pierwszy cytat z tekstu."
          endLabel="endLabel"
          longFormLabel="longFormLabel"
          onReadLongForm={() => undefined}
        />
      </Specimen>

      <Specimen
        isFullWidth
        code={'<NextText to="…" label="…" title="…" />'}
        note="Full-width link to the next text at the bottom of a text page."
      >
        <NextText to="#article" label="label — 03" title="Title" />
      </Specimen>
    </Group>
  </Layout>
);

export default Styleguide;

export const Head = () => (
  <>
    <SEO title="Styleguide" />
    <meta name="robots" content="noindex" />
  </>
);

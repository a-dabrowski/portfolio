# Writing a text in markdown

A text is one markdown file. The file has two parts: a header with fields (title, date, stamp, scale…) and a body. Every element of the article design is reached from these two parts. No JSX, HTML or CSS is needed.

This page lists every option, what it does on the site, and what happens when it is left out.

- [1. Create the file](#1-create-the-file)
- [2. Header fields](#2-header-fields)
- [3. Body: styling with markdown](#3-body-styling-with-markdown)
- [4. Short form](#4-short-form)
- [5. What the site adds on its own](#5-what-the-site-adds-on-its-own)
- [6. Full example](#6-full-example)
- [7. Common mistakes](#7-common-mistakes)

## 1. Create the file

Path: `content/texts/pl/<slug>.md`

The file name is the address. `tramwaj-to-parlament.md` is published at `/texts/tramwaj-to-parlament/`. Use lowercase letters, digits and hyphens. No spaces, no Polish characters.

Preview with `make start`, then open `http://localhost:8000/texts/<slug>/`.

## 2. Header fields

The header sits at the top of the file between two `---` lines:

```markdown
---
title: Tramwaj to parlament
date: 2026-03-14
form: Bit
dek: Raport terenowy z jedenastu lat niesiadania.
lede: Każdy warszawski tramwaj to mały parlament. Nikogo nie wybrano, każdy ma zdanie.
stamp: Nie sprawdzono faktów
dateline: Warszawa — Tramwaj 17 — 07:42 — Na stojąco
scale: 0.58
---
```

Only `title` and `date` are required. Each other field switches one element of the design on; leave the field out and that element is not rendered.

### `title` (required)

The headline. Shown as the large title on the text page, in the `/texts/` list, in the home page lists, in the "next text" band at the bottom of other texts, and in the browser tab.

### `date` (required)

Format `YYYY-MM-DD`. It controls three things:

- **Year label.** Only the year is displayed ("Bit — 2026").
- **Order.** Lists show the newest text first.
- **Number.** Texts are numbered from the oldest (`01`) upward. A new text with the latest date gets the next number and existing numbers stay the same. A text with a backdated `date` is inserted in the middle and shifts the numbers of all newer texts.

### `form`

The kind of text: `Bit`, `Monolog`, `Felieton`, or any other word.

- Shown next to the year: "Bit — 2026".
- Each distinct value becomes one filter button on `/texts/`, with a count. `Bit` and `bit` are two different buttons, so keep the spelling identical.
- Left out: the label shows only the year, and the text appears only under "Wszystkie".

### `dek`

One sentence under the title that says what the text is about.

- Shown in italics under the headline on the text page and under the title in the `/texts/` list.
- Left out: the line is not rendered.

### `lede`

The text condensed to one paragraph (2–3 sentences).

- It is the whole content of the short form (see [section 4](#4-short-form)). Filling it in makes the "Wersja długa / Wersja krótka" switch appear.
- It is the description shown by search engines and link previews.
- It is **not** printed in the long form. If the opening paragraph should say the same thing, write it in the body too.
- Left out: no switch, no short form; the search description is the first 160 characters of the body.

### `stamp`

A short verdict, 2–4 words: `Nie sprawdzono faktów`, `Matka nie zatwierdziła`.

- Shown as a tilted, outlined stamp at the bottom right of the header on the text page, and as a small line in the `/texts/` list.
- The `✕` in front is added automatically. Do not type it.
- Left out: no stamp.

### `dateline`

Where and when the text takes place: `Warszawa — Tramwaj 17 — 07:42 — Na stojąco`.

- Shown on the left of the dark strip under the header, after the label "Miejsce akcji —". Do not type the label.
- Separate the parts with `—` to match the rest of the design. It is plain text; any wording works.
- Left out: the strip shows only the reading time on the right.

### `scale`

A number from `0` to `1` that places the text on the serious–absurd scale.

| Value  | Position of the marker        |
| ------ | ----------------------------- |
| `0`    | far left, "Poważny komentarz" |
| `0.5`  | middle                        |
| `0.86` | 86% of the way to the right   |
| `1`    | far right, "Czysty absurd"    |

- Shown as a horizontal line with a red marker and the caption "↑ Ten tekst" under the header on the text page, and as a small "Serio ▬ Absurd" line in the `/texts/` list.
- Values below `0` or above `1` are treated as `0` and `1`.
- Use a dot, not a comma: `0.58`.
- `scale: 0` shows the scale with the marker at the far left. To hide the scale, remove the line.

## 3. Body: styling with markdown

Everything below the header is the body. Leave one empty line between blocks (paragraphs, quotes, notes, images).

### Quick reference

| You write                             | You get                                      |
| ------------------------------------- | -------------------------------------------- |
| plain paragraph                       | body text                                    |
| `~~skreślone~~`                       | grey text struck through in red              |
| `*zaznaczone*`                        | red highlighter                              |
| `**mocne**`                           | bold                                         |
| `\|\|tajne\|\|`                       | blacked out, readable on hover or tap        |
| `zdanie.[^1]` + `[^1]: Treść.`        | footnote                                     |
| `> Cytat.`                            | pull quote across the page                   |
| `>> Notatka.`                         | note in the left margin                      |
| `[Długa pauza.]` as a whole paragraph | stage direction in a black box               |
| `![Podpis](../images/plik.jpg)`       | black-and-white photo, caption in the margin |
| `## Śródtytuł`, `### Mniejszy`        | section headings                             |
| `- punkt`, `1. punkt`                 | bullet list, numbered list                   |
| `[tekst](https://adres)`              | link                                         |

### Paragraphs and the large initial

A paragraph is one or more lines of text followed by an empty line.

The first paragraph of the text gets a large red first letter automatically. There is nothing to mark. One exception: if the text opens with a stage direction (`[…]`), no paragraph gets the initial. Start with a normal paragraph to keep it.

### Strike-through: `~~text~~`

```markdown
Pani z wózkiem ma głos ~~decydujący~~ rozstrzygający.
```

The struck word turns grey with a red line through it. Use it for the "corrected on the fly" joke: the wrong word struck, the right word after it.

### Highlighter: `*text*`

```markdown
Zawsze był ktoś, kto _wyglądał, jakby bardziej na to miejsce zasługiwał_.
```

Red background, semi-bold. There is no italic in the article body: single asterisks (and single underscores, `_text_`) always produce the highlighter.

### Bold: `**text**`

```markdown
To **nie** jest rozmowa telefoniczna.
```

Heavier weight, no colour.

### Redaction: `||text||`

```markdown
Kiedy wsiada kontroler, każdy staje się ||prawnikiem||.
```

The words are covered by a black bar. Hovering with the mouse, tapping, or focusing with the keyboard reveals them. The tooltip "Zaczernione. Najedź, jeśli musisz." is added automatically.

Limits:

- Keep the opening and closing `||` in the same sentence, with no other formatting between them. `||tajne **bardzo**||` does not work. `**||tajne||**` does.
- The text is hidden visually only. It is still in the page source, so do not use it for anything actually confidential.

### Footnotes: `[^1]`

```markdown
Ktoś przynosi Pawła, którego nigdy nie widziałeś.[^1]

[^1]: Został do drugiej w nocy. Dziś to bliski przyjaciel.
```

- The marker in the sentence becomes a small red number.
- The definitions (`[^1]: …`) can be anywhere in the file; the end is the convention. They are collected into a separate section under the text, headed "Przypisy, o które nikt nie prosił", each with a ↩ link back to its place.
- Numbers on the page follow the order of the markers in the text, whatever labels are used in the file.
- No footnotes in the file: the section is not rendered.

### Pull quote: `> text`

```markdown
> Uprzejmość to tchórzostwo z dobrą postawą.
```

Very large uppercase condensed type across the full width, between two black rules, with a red opening quotation mark. The quotation mark is added automatically; do not type quote characters unless the line quotes someone inside the quote.

Keep it to one sentence. At this size a long quote fills the screen.

The first pull quote in the file is also used in the short form ([section 4](#4-short-form)).

### Margin note: `>> text`

```markdown
> > Ma go od 1994 roku.

Każdy warszawski tramwaj to mały parlament.
```

A small, slightly tilted red italic note in the left margin, next to the block that follows it.

- Put the note **before** the paragraph it comments on, as its own block with an empty line after it.
- On screens narrower than 700px there is no margin; the note appears above the paragraph.
- Keep it short (one line of a few words). The margin is 160–200px wide.

### Stage direction: `[text]`

```markdown
[Długa pauza. Komuś dzwoni telefon melodyjką z 2009 roku.]
```

A black box with white uppercase text, slightly tilted.

Rules:

- The whole paragraph must be inside one pair of square brackets: it starts with `[` and ends with `]`.
- No formatting inside (`*`, `**`, `~~`, links) and no second `]` inside. With any of these the paragraph is shown as normal text, brackets included.
- A paragraph that only starts with a bracket, like `[Sic] i dalej tekst.`, stays a normal paragraph.

### Photo: `![caption](../images/file.jpg)`

1. Put the image in `content/texts/images/` (JPG, PNG or WebP).
2. Write on its own line, with empty lines around it:

```markdown
![Ryc. 1 — Miejsce, o które chodzi. Puste. Nietknięte. Święte.](../images/salty_egg.jpg)
```

- The photo is shown in black and white with a red square on its top right corner, in the text column (up to 680px wide). Resizing is automatic.
- The text in the square brackets is the caption. It is shown in the left margin in italics (under the photo on narrow screens) and is also the image's alternative text.
- An image placed inside a sentence stays inline and gets no margin caption. Keep it on its own line.

### Section headings: `##` and `###`

```markdown
## Zasady

### Zasada pierwsza
```

Uppercase narrow headings, `##` larger than `###`. Do not use a single `#`; the page title already comes from `title`.

### Lists and links

```markdown
- Plecak zdejmujemy na Centrum.
- Żadnego kontaktu wzrokowego.

1. Wsiąść.
2. Nie usiąść.

Więcej na [stronie ZTM](https://www.ztm.waw.pl).
```

Bullet lists get square bullets, numbered lists get numbers. Links are shown in red.

### Punctuation

Straight quotes (`"…"`) are converted to English curly quotes (“…”), `--` to a dash and `...` to an ellipsis. Polish quotes are not produced automatically: type `„…”` yourself. Characters typed directly (`—`, `„`, `”`) are kept as they are.

## 4. Short form

The text page has a "Wersja długa / Wersja krótka" switch. The short form is not a second file. It is assembled from the same file:

| Part of the short form | Comes from                                 |
| ---------------------- | ------------------------------------------ |
| large paragraph        | `lede` in the header                       |
| pull quote             | the first `> quote` in the body, if any    |
| "Czytaj wersję długą"  | added automatically, with the reading time |

- To offer a short form: fill in `lede`.
- To offer none: leave `lede` out. The switch is not shown.
- To choose the quote: make it the first `>` quote in the file. A margin note (`>>`) does not count.
- The header (title, dek, stamp, dateline, scale) is the same in both forms. The strip shows "1 min" for the short form.

## 5. What the site adds on its own

These need no input:

| Element                                 | Source                                              |
| --------------------------------------- | --------------------------------------------------- |
| text number ("01")                      | `date`, oldest text = 01                            |
| "Tekst 03 z 04", previous/next arrows   | order by `date`; left/right arrow keys also work    |
| reading time                            | length of the body                                  |
| "Spisał Dąbrowski, który przy tym był"  | `content/i18n/pl.json` → `article.filedBy`          |
| end mark "Koniec. Podobno."             | `content/i18n/pl.json` → `article.end`              |
| "next text" band at the bottom          | the next older text; the oldest links to the newest |
| entry on `/texts/` and on the home page | automatic; the home page lists the newest texts     |

All fixed labels (scale captions, "Miejsce akcji", the footnotes heading, the redaction tooltip) are in `content/i18n/pl.json` under `article` and `texts`. Change them there for every text at once.

## 6. Full example

`content/texts/pl/tramwaj-to-parlament.md`:

```markdown
---
title: Tramwaj to parlament
date: 2026-03-14
form: Bit
stamp: Nie sprawdzono faktów
scale: 0.58
dateline: Warszawa — Tramwaj 17 — 07:42 — Na stojąco
dek: Raport terenowy z jedenastu lat niesiadania.
lede: Każdy warszawski tramwaj to mały parlament. Nikogo nie wybrano, każdy ma zdanie, a pani z wózkiem na zakupy ma głos rozstrzygający.
---

> > Ma go od 1994 roku.

Każdy warszawski tramwaj to mały parlament. Nikogo nie wybrano, każdy ma zdanie, a pani z wózkiem na zakupy ma głos ~~decydujący~~ rozstrzygający.[^1]

Jeżdżę siedemnastką od jedenastu lat. Ani razu nie usiadłem. Zawsze był ktoś, kto _wyglądał, jakby bardziej na to miejsce zasługiwał_.

[Długa pauza. Komuś dzwoni telefon melodyjką z 2009 roku.]

> Uprzejmość to tchórzostwo z dobrą postawą.

Kiedy wsiada kontroler, każdy staje się ||prawnikiem||, turystą albo człowiekiem głęboko zainteresowanym oknem.

![Ryc. 1 — Miejsce, o które chodzi. Puste. Nietknięte. Święte.](../images/salty_egg.jpg)

[Kłania się. Nikt nie klaszcze. Ktoś klaszcze.]

[^1]: W wózku są ziemniaki, kot albo jedno i drugie. Nikt nie sprawdzał.
```

This file uses every element: margin note, initial, strike-through, footnote, highlighter, stage direction, pull quote, redaction and photo. The other texts in `content/texts/pl/` are working examples too.

The smallest valid text:

```markdown
---
title: Krótko
date: 2026-11-19
---

Jeden akapit.
```

## 7. Common mistakes

| Symptom                                      | Cause and fix                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Build fails after adding a text              | `title` or `date` is missing, or the header is not closed with `---`.                                                                      |
| Build fails with a YAML error                | A header value contains `: ` (colon + space), or starts with `[`, `"`, `*`, `>` or `#`. Wrap the value in quotes: `dek: "Uwaga: tramwaj"`. |
| Text is italic-less; `*word*` is red         | Intended. `*…*` is the highlighter.                                                                                                        |
| `[Pauza.]` shows as plain text with brackets | The paragraph has text outside the brackets, formatting inside, or no empty line before/after.                                             |
| Margin note sits next to the wrong paragraph | The `>>` line must come before the paragraph, not after.                                                                                   |
| A note renders as a huge quote               | Written with one `>`. A margin note needs two: `>>`.                                                                                       |
| Two blocks merged into one                   | Missing empty line between them.                                                                                                           |
| No large initial                             | The text opens with a stage direction. Start with a normal paragraph.                                                                      |
| Photo has no margin caption                  | The image shares a line with text. Put it on its own line.                                                                                 |
| Photo is missing or broken                   | Wrong path. From `content/texts/pl/` the path is `../images/<file>`.                                                                       |
| No "Wersja krótka" switch                    | `lede` is not set.                                                                                                                         |
| Scale missing or build fails on `scale`      | `scale` is not set, or written with a comma (`0,58`). Use a dot.                                                                           |
| Two filter buttons for the same form         | Different spelling or capitalisation of `form` between texts.                                                                              |
| `\|\|text\|\|` shows the pipes               | Formatting or a line break between the two `\|\|`. Keep plain text inside.                                                                 |

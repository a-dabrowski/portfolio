## Start development

`make start` initiates HMR for development on `localhost:8000`

## Publishing content

Everything below is a file change: add or edit the file, check it with `make start`, commit. No component code is needed.

### A text (long form)

Create `content/texts/pl/<slug>.md`. The file name becomes the address: `tramwaj-to-parlament.md` is published at `/texts/tramwaj-to-parlament/`. Use lowercase letters, digits and hyphens, no Polish characters.

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

Pierwszy akapit tekstu.
```

Header fields:

| Field      | Required | Where it shows                                    | If left out                                         |
| ---------- | -------- | ------------------------------------------------- | --------------------------------------------------- |
| `title`    | yes      | everywhere                                        | build fails                                         |
| `date`     | yes      | year label, order of texts, text number           | build fails                                         |
| `form`     | no       | label ("Bit — 2026") and the filter on `/texts/`  | no label; the text is listed only under "Wszystkie" |
| `dek`      | no       | italic line under the title, and in the index row | line is hidden                                      |
| `lede`     | no       | short form, search/social description             | no short form (see below)                           |
| `stamp`    | no       | tilted stamp in the header, index row             | stamp is hidden                                     |
| `dateline` | no       | dark strip under the header                       | strip shows reading time only                       |
| `scale`    | no       | serious–absurd scale, `0` = serious, `1` = absurd | scale is hidden                                     |

`form` is free text. Each distinct value becomes one filter button, so keep the spelling identical between texts (`Bit`, `Monolog`, `Felieton`).

Texts are numbered by `date`, oldest = 01. A new text gets the next number and appears first in the lists. Reading time is computed from the length.

Body syntax:

| You write                                                          | You get                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| a normal paragraph                                                 | body text; the first paragraph gets the large red initial          |
| `~~skreślone~~`                                                    | struck through in red                                              |
| `*zaznaczone*`                                                     | red highlighter                                                    |
| `**mocne**`                                                        | bold                                                               |
| `\|\|tajne\|\|`                                                    | blacked out, readable on hover or tap                              |
| `zdanie.[^1]` and, at the end of the file, `[^1]: Treść przypisu.` | numbered footnote in a separate section                            |
| `> Cytat.`                                                         | large pull quote across the page                                   |
| `>> Notatka.` on its own line, directly before a paragraph         | handwritten-style note in the margin next to that paragraph        |
| `[Długa pauza.]` alone in a paragraph                              | stage direction in a black box                                     |
| `![Podpis](../images/plik.jpg)` alone on a line                    | photo with the caption in the margin (see "A photo inside a text") |
| `## Śródtytuł`                                                     | section heading                                                    |

Leave an empty line between blocks. There is no italic: `*text*` is the highlighter.

### A short text

There are two different things called "short":

1. **A text that is simply short.** Same file as above with a few paragraphs, or one. Every field and every body element stays optional, so the minimum is `title`, `date` and one paragraph.

2. **The short form of a longer text** (the "Wersja długa / Wersja krótka" switch on the text page). It is not a separate file. It is built from:

   - `lede` from the header, shown as one large paragraph;
   - the first `> pull quote` in the body, if there is one.

   To offer a short form, fill in `lede`. To have none, leave `lede` out; the switch then does not appear. To choose which quote the short form shows, make it the first `>` quote in the file.

### A photo inside a text

1. Put the image in `content/texts/images/` (JPG, PNG or WebP).
2. In the text, on its own line: `![Ryc. 1 — Podpis zdjęcia.](../images/plik.jpg)`

The text in the square brackets is the caption. The photo is shown in black and white.

### A photo in an existing gallery

1. Convert the photo to WebP. Only `.webp` files are shown; `scripts/convert_to_webp.sh` converts every JPG in the current folder (needs `cwebp`).
2. Put it in that gallery's folder under `content/assets/photography/`, for example `content/assets/photography/balkan/`.

Photos are ordered by file name. The first one is the gallery cover on `/photography/`.

### A new gallery

1. Create a folder with the WebP files: `content/assets/photography/<folder>/`.
2. Add an entry to `content/photography/galleries.json`:

```json
{ "slug": "nowa_sesja", "directory": "<folder>", "title": "Nowa sesja" }
```

- `slug` is the address: `/photography/nowa_sesja/`.
- `directory` is the folder name from step 1.
- `title` is shown on the page and in the list.

The position in the file is the order on `/photography/` and gives the number ("Nr 03"). The first entry is the large lead photo. To hide a gallery, remove its entry; the files can stay.

### Site copy, contact links, season

Headings, button labels, the hero copy, the contact rows and the season in the header are all in `content/i18n/pl.json`.

### Another language

Polish is the only language switched on. To add English:

1. Add `'en'` to `LOCALES` in `src/i18n/locales.ts`.
2. Copy `content/i18n/pl.json` to `en.json` and translate it; register it in `src/i18n/index.tsx`.
3. Put translated texts in `content/texts/en/`. The same file name as in `pl/` means the same text.

English pages are then published under `/en/`.

## Issues

### Problem with sharp while running gatsby commands

Remove `node_modules` and `package-lock.json`. Make sure that you are running Node version specified in `.nvmrc` or `.tool-versions`. Then reinstall packages with `npm i --legacy-peer-deps`.

### Converting images

This project uses `webp` format images for publishment. Run script from `/scripts/convert_to_webp.sh` to convert jpg images.

<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

<!-- AUTO-GENERATED-CONTENT:END -->

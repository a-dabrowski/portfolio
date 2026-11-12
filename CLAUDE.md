# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gatsby 5 website for dabrowski.studio. Main purpose: stand-up texts (markdown articles) and booking contact; photography galleries live on their own pages. Polish is the primary language. Hosted on Netlify. Written in TypeScript.

## Commands

| Task | Command |
|------|---------|
| Dev server | `make start` or `gatsby develop` |
| Build | `make build` or `gatsby build` |
| Type check | `npm run type-check` (tsc --noEmit) |
| Format | `make format` or `prettier --write "**/*.{js,jsx,ts,tsx,json,md}"` |
| Test all | `npm test` (Jest) |
| Test single | `npx jest path/to/file.spec.tsx` |
| Serve build | `gatsby serve` |
| Clean cache | `gatsby clean` |
| Convert images to WebP | `bash scripts/convert_to_webp.sh` |

**Node version**: 18.9.0 (see `.nvmrc`). If sharp fails on install, delete `node_modules` + `package-lock.json` and reinstall with `npm i --legacy-peer-deps`.

## Architecture

**Framework**: Gatsby 5 with React 18, TypeScript, GraphQL data layer, static site generation. GraphQL typegen is enabled in `gatsby-config.ts`.

**Routing**: `gatsby-node.ts` creates the main pages per language from `src/templates/`: `home.tsx` (`/`), `texts.tsx` (`/texts/`, the index with form filter), `text.tsx` (`/texts/<slug>/`, long/short switch), `photography.tsx` (`/photography/`), `gallery.tsx` (`/photography/<slug>/`). Standalone pages (`404`, `photography/offer`, legacy `development`, `recommended`) are file-based in `src/pages/`. Old URLs redirect via `static/_redirects`.

**Languages**: `src/i18n/locales.ts` lists the languages (`LOCALES`, default `pl` at the site root, others under `/<code>/`). UI strings are JSON (`content/i18n/<code>.json`, read with `useDictionary()` or `dictionaries[locale]`); texts are markdown in one folder per language (`content/texts/<code>/<slug>.md`). Never hard-code visible copy in components. To add English: add `'en'` to `LOCALES`, create `content/i18n/en.json` (TypeScript enforces the same shape as `pl.json`), register it in `src/i18n/index.tsx`, add `content/texts/en/*.md`.

**Writing a text** (no JSX needed; `plugins/gatsby-remark-studio-text` + `src/components/article/Article.module.scss` map markdown to the design):

| Markdown | Renders as |
|---|---|
| frontmatter `title`, `date`, `form`, `dek`, `lede`, `stamp`, `dateline`, `scale` (0–1) | hero, home card, stamp, dateline strip, absurdity scale (only `title` and `date` are required) |
| first paragraph | drop cap (automatic) |
| `~~text~~` | accent strike-through |
| `*text*` | highlighter mark (`**text**` stays bold) |
| `\|\|text\|\|` | redaction, readable on hover/focus |
| `[^1]` + `[^1]: note` | footnote, listed in its own section |
| `> quote` | full-width pull quote |
| `>> note` (placed before a paragraph) | margin note next to that paragraph |
| paragraph that is only `[bracketed]` | stage direction box |
| `![Caption](../images/file.jpg)` on its own line | figure with margin caption |

The short form of a text is built automatically from `lede` plus the first `> quote`; a text without `lede` has no short form.

Text numbers ("01") follow publication date, oldest first, so they stay stable.

**Content sources**:
- Texts: Markdown files in `content/texts/<locale>/`, images in `content/texts/images/`
- UI strings: `content/i18n/<locale>.json`
- Gallery list (slug, image folder, title): `content/photography/galleries.json` — add an entry to publish a new gallery
- Projects & stack: JSON files in `content/development/` (imported directly in components)
- Photography images: WebP files in `content/assets/photography/`, queried via GraphQL with `sourceInstanceName: "photography"`

**Type definitions**: Shared types in `src/types/index.ts` (`GalleryPageData`, `GalleryImageNode`, `ProjectData`, `StackItem`, `MarkdownRemarkNode`, etc.). Module declarations for SVG, SCSS modules, and image imports in `src/types/declarations.d.ts`.

**Design system** (v2, "Modernist"): tokens in `src/styles/tokens.css`, base element styles in `src/components/globalStyle.css`, Archivo variable font (width + weight axes). Build pages from the primitives instead of ad-hoc markup: `typography` (`Display`, `Heading`, `Numeral`, `Label`, `Body`, `Accent`, `Lines`), `links` (`SmartLink`, `ArrowLink`, `RowLink`), `buttons/Button`, `buttons/Toggle`, `section` (`Container`, `RailSection`, `Band`, `Rule`), `tiles` (`TileGrid`, `Tile`), `article/*`, `textRow`, `site/SiteHeader|SiteFooter`. Primitive stylesheets are imported in a fixed order in `gatsby-browser.ts`; add new primitives there. Pre-v2 components (`Cta`, `MinimalButton`, `ImageButton`, `curtainMenu`, `mainMenu`, `bio`, `header`, `foldingDoor`, `diagonalBox`, `testimonial`, `project`) are legacy.

**Styling** (three approaches coexist; new code uses SCSS modules with camelCase class names + tokens):
- **Tailwind CSS** — primary utility classes, configured via `tailwind.config.js` + PostCSS
- **SCSS Modules** — component-scoped styles (`*.module.scss`), color palettes in `src/components/colors.scss`
- **Plain CSS** — some component-specific files (`Cta.css`, `Project.css`, `globalStyle.css`)

**Image galleries**: PhotoSwipe 5 lightbox, wrapped in `src/components/swiper.tsx`. `src/templates/gallery.tsx` queries full + square thumbnail variants for one folder (`$directory`); it uses the shared `GalleryPageData` type.

**Forms**: react-final-form with Netlify Forms integration (`data-netlify="true"`, submitted via fetch to `/`).

**SEO**: Gatsby Head API. Each page exports `export const Head = () => <SEO title="..." />`; `src/components/seo.tsx` renders `<title>`/`<meta>`/`<html lang>` with `useStaticQuery` for site metadata. Don't render `<SEO>` inside the page body — it only works from `Head`.

**Images**: Never ship `publicURL` of a photography source file to the browser — always go through `childImageSharp { gatsbyImageData(...) }` so sharp resizes it. Sources are already lossy WebP; keep `quality` at 75–80 (q100 re-encoding measured ~3.7x larger with no visible gain). Raw `<img>` tags need `width`/`height` and `loading="lazy"`.

**CSS bundling**: Gatsby merges all CSS into one global `styles.css` inlined on every page, regardless of where it's imported — moving a CSS import into a component does not code-split it.

## Key Configuration

- **TypeScript**: `tsconfig.json` — strict mode, noEmit (Gatsby handles compilation via Babel)
- **Gatsby config**: `gatsby-config.ts` — plugins, site metadata, filesystem sources, graphqlTypegen
- **Gatsby node**: `gatsby-node.ts` — per-language page creation, `locale`/`slug` fields on texts, frontmatter schema
- **Gatsby browser**: `gatsby-browser.ts` — global style imports (Prism, PhotoSwipe, Tailwind)
- **Gatsby SSR**: `gatsby-ssr.tsx` — font `<link>`/`preconnect` tags in `<head>` (Google Fonts: Archivo). Don't add fonts via CSS `@import`; it delays first paint.
- **Jest**: `jest.config.js` — babel transform for TS/TSX, CSS module mocking, setup in `tests/`

## Testing

**Stack**: Jest 29 + React Testing Library + `@testing-library/jest-dom`

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm test -- --verbose` | Run with detailed output |
| `npm test -- --coverage` | Run with coverage report |
| `npm test -- src/components/bio.spec.tsx` | Run a single test file |
| `npm test -- --testPathPattern="buttons"` | Run tests matching a pattern |

**Test structure**:
- Unit tests live next to their component (e.g. `src/components/buttons/Cta.spec.tsx`)
- Integration tests (pages/templates) live in `__tests__/` subdirectories (e.g. `src/pages/__tests__/blog.spec.tsx`)
- Shared fixtures and helpers in `tests/test-utils.tsx` (`mockSiteMetadata`, `mockGalleryImages`, `mockBlogPost`, `mockProjectData`, `mockLocation`, `setupUseStaticQuery`)

**Mocks** (in `tests/__mocks__/`):
- `gatsby.js` — mocks `graphql`, `Link`, `useStaticQuery`, `StaticQuery`
- `gatsby-plugin-image.js` — mocks `GatsbyImage` and `StaticImage` as plain `<img>` tags
- `photoswipe/lightbox.js` — mocks `PhotoSwipeLightbox` with no-op `init()`/`destroy()`
- `file-mock.js` — stubs image/media imports

**Writing new tests**:
- Use `.spec.tsx` suffix, place next to the component
- Import `setupUseStaticQuery` from `tests/test-utils` for components that use `useStaticQuery` (SEO, Bio, or any page using Layout + SEO)
- Call `setupUseStaticQuery()` in a `beforeEach` block
- Use `mockLocation` from `tests/test-utils` when rendering page components that require a `location` prop

## Conventions

- **Language**: TypeScript (`.ts`/`.tsx`) for all source files; config files (jest, tailwind, postcss) remain JS
- **Code style**: Prettier enforced — semicolons, single quotes, 2-space indent, ES5 trailing commas
- **File naming**: PascalCase components (`MinimalButton.tsx`), kebab-case pages and styles
- **Tests**: `*.spec.tsx` suffix, React Testing Library + Jest, snapshot tests used
- **Images**: WebP format required for photography assets
- **Components**: Functional components with hooks; use Gatsby's `PageProps<DataType>` for page component typing
- **Git**: Feature branches as `feat/feature-name`, PR-based workflow

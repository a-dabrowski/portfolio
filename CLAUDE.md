# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gatsby 5 portfolio/photography website for dabrowski.studio. Combines a photography gallery, development project showcase, and blog. Hosted on Netlify. Written in TypeScript.

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

**Routing**: File-based via `src/pages/`. Blog posts are generated dynamically in `gatsby-node.ts` from markdown in `content/blog/` using `src/templates/blog-post.tsx`.

**Content sources**:
- Blog posts: Markdown files in `content/blog/` (frontmatter: title, date, description)
- Projects & stack: JSON files in `content/development/` (imported directly in components)
- Photography images: WebP files in `content/assets/photography/`, queried via GraphQL with `sourceInstanceName: "photography"`

**Type definitions**: Shared types in `src/types/index.ts` (`GalleryPageData`, `GalleryImageNode`, `ProjectData`, `StackItem`, `MarkdownRemarkNode`, etc.). Module declarations for SVG, SCSS modules, and image imports in `src/types/declarations.d.ts`.

**Styling** (three approaches coexist):
- **Tailwind CSS** — primary utility classes, configured via `tailwind.config.js` + PostCSS
- **SCSS Modules** — component-scoped styles (`*.module.scss`), color palettes in `src/components/colors.scss`
- **Plain CSS** — some component-specific files (`Cta.css`, `Project.css`, `globalStyle.css`)

**Image galleries**: PhotoSwipe 5 lightbox, wrapped in `src/components/swiper.tsx`. Each photography page has its own GraphQL query fetching full + thumbnail image variants. Pages use the shared `GalleryPageData` type.

**Forms**: react-final-form with Netlify Forms integration (`data-netlify="true"`, submitted via fetch to `/`).

**SEO**: React Helmet in `src/components/seo.tsx` with `useStaticQuery` for site metadata.

## Key Configuration

- **TypeScript**: `tsconfig.json` — strict mode, noEmit (Gatsby handles compilation via Babel)
- **Gatsby config**: `gatsby-config.ts` — plugins, site metadata, filesystem sources, graphqlTypegen
- **Gatsby node**: `gatsby-node.ts` — dynamic blog page creation, slug generation
- **Gatsby browser**: `gatsby-browser.ts` — global style imports (Prism, PhotoSwipe, Tailwind)
- **Jest**: `jest.config.js` — babel transform for TS/TSX, CSS module mocking, setup in `tests/`

## Conventions

- **Language**: TypeScript (`.ts`/`.tsx`) for all source files; config files (jest, tailwind, postcss) remain JS
- **Code style**: Prettier enforced — semicolons, single quotes, 2-space indent, ES5 trailing commas
- **File naming**: PascalCase components (`MinimalButton.tsx`), kebab-case pages and styles
- **Tests**: `*.spec.tsx` suffix, React Testing Library + Jest, snapshot tests used
- **Images**: WebP format required for photography assets
- **Components**: Functional components with hooks; use Gatsby's `PageProps<DataType>` for page component typing
- **Git**: Feature branches as `feat/feature-name`, PR-based workflow

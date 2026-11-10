import React from 'react';
import type { GatsbySSR } from 'gatsby';

// Fonts load from <link> tags in <head> instead of CSS @import. An @import
// inside the inlined page CSS is only discovered after that CSS is parsed,
// which chains three requests (CSS -> font CSS -> font files) before first
// paint. The preconnect opens the font-file origin while the font CSS is
// still downloading.
export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <link
      key="preconnect-gstatic"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="google-fonts"
      rel="stylesheet"
      // Archivo as a variable font: the design sets width (font-stretch 62–100%)
      // and weight (400–800) per element, in both upright and italic.
      href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&display=swap"
    />,
  ]);
};

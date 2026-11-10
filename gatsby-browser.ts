import 'prismjs/themes/prism.css';
import 'photoswipe/style.css';
import './src/styles/global.css';
import './src/styles/tokens.css';
import './src/components/globalStyle.css';

// Primitive component styles, loaded here in a fixed order. Gatsby merges all
// CSS into one file; without this the order depends on which page imports
// what first, and a page-level class could lose to the primitive it overrides.
import './src/components/typography/Typography.module.scss';
import './src/components/links/Links.module.scss';
import './src/components/buttons/Button.module.scss';
import './src/components/section/Section.module.scss';
import './src/components/tiles/Tiles.module.scss';

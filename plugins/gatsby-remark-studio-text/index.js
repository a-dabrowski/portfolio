// Sub-plugin of gatsby-transformer-remark. Lets a text be written as plain
// markdown and still hit every block of the article design:
//
//   [Długa pauza.]        paragraph that is only [bracketed]  -> stage direction
//   >> Notatka            blockquote inside a blockquote       -> margin note
//   ||tajne||             double pipes                         -> redaction
//   ![Podpis](./foto.jpg) image alone on a line                -> figure (lifted
//                         out of its <p> so the caption can sit in the margin)
//
// Everything else in the design (pull quote, strike, highlight, footnotes,
// drop cap) is standard markdown styled by Prose.module.scss.

const STAGE_DIRECTION = /^\[[^\]]+\]$/;
const REDACTION = /\|\|(.+?)\|\|/g;

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const redactText = (node, redactionTitle) => {
  const parts = node.value.split(REDACTION);
  if (parts.length === 1) {
    return [node];
  }
  // split() with one capture group alternates plain text and captured text.
  return parts
    .map((part, index) =>
      index % 2 === 1
        ? {
            type: 'html',
            value: `<span class="text-redacted" tabindex="0" title="${escapeHtml(
              redactionTitle
            )}">${escapeHtml(part)}</span>`,
          }
        : { type: 'text', value: part }
    )
    .filter((part) => part.value !== '');
};

const redactChildren = (node, redactionTitle) => {
  if (!node.children) {
    return;
  }
  node.children = node.children.flatMap((child) => {
    if (child.type === 'text') {
      return redactText(child, redactionTitle);
    }
    redactChildren(child, redactionTitle);
    return [child];
  });
};

const transformBlock = (node) => {
  const onlyChild =
    node.children && node.children.length === 1 ? node.children[0] : null;
  if (!onlyChild) {
    return node;
  }

  if (node.type === 'paragraph') {
    if (
      onlyChild.type === 'html' &&
      onlyChild.value.trimStart().startsWith('<figure')
    ) {
      return onlyChild;
    }
    if (
      onlyChild.type === 'text' &&
      STAGE_DIRECTION.test(onlyChild.value.trim())
    ) {
      return { ...node, data: { hProperties: { className: ['text-stage'] } } };
    }
  }

  if (node.type === 'blockquote' && onlyChild.type === 'blockquote') {
    return {
      ...node,
      children: onlyChild.children,
      data: { hName: 'aside', hProperties: { className: ['text-note'] } },
    };
  }

  return node;
};

const transformTree = (markdownAST, { redactionTitle = '' } = {}) => {
  markdownAST.children = markdownAST.children.map(transformBlock);
  redactChildren(markdownAST, redactionTitle);
  return markdownAST;
};

module.exports = ({ markdownAST }, pluginOptions) =>
  transformTree(markdownAST, pluginOptions);
module.exports.transformTree = transformTree;

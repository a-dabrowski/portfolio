const { transformTree } = require('./index');

const text = (value) => ({ type: 'text', value });
const paragraph = (...children) => ({ type: 'paragraph', children });
const blockquote = (...children) => ({ type: 'blockquote', children });
const root = (...children) => ({ type: 'root', children });

const transform = (...children) =>
  transformTree(root(...children), { redactionTitle: 'Hidden' }).children;

describe('gatsby-remark-studio-text', () => {
  it('marks a paragraph written as [bracketed text] as a stage direction', () => {
    const [stage] = transform(paragraph(text('[Długa pauza.]')));
    expect(stage.data.hProperties.className).toEqual(['text-stage']);
  });

  it('leaves a paragraph that only starts with a bracket untouched', () => {
    const [plain] = transform(paragraph(text('[Sic] and then more text.')));
    expect(plain.data).toBeUndefined();
  });

  it('turns a double blockquote into a margin note element', () => {
    const [note] = transform(
      blockquote(blockquote(paragraph(text('Od 1994.'))))
    );
    expect(note.data).toEqual({
      hName: 'aside',
      hProperties: { className: ['text-note'] },
    });
  });

  it('keeps the margin note content one level deep', () => {
    const [note] = transform(
      blockquote(blockquote(paragraph(text('Od 1994.'))))
    );
    expect(note.children).toEqual([paragraph(text('Od 1994.'))]);
  });

  it('leaves a single blockquote as a pull quote', () => {
    const [quote] = transform(blockquote(paragraph(text('Cytat.'))));
    expect(quote.data).toBeUndefined();
  });

  it('wraps ||text|| in a redaction span and keeps the surrounding text', () => {
    const [{ children }] = transform(
      paragraph(text('Każdy staje się ||prawnikiem|| albo turystą.'))
    );
    expect(children).toEqual([
      text('Każdy staje się '),
      {
        type: 'html',
        value:
          '<span class="text-redacted" tabindex="0" title="Hidden">prawnikiem</span>',
      },
      text(' albo turystą.'),
    ]);
  });

  it('escapes HTML inside a redaction', () => {
    const [{ children }] = transform(paragraph(text('||<b>&</b>||')));
    expect(children[0].value).toContain('&lt;b&gt;&amp;&lt;/b&gt;');
  });

  it('redacts text nested inside inline formatting', () => {
    const [{ children }] = transform(
      paragraph({ type: 'emphasis', children: [text('||tajne||')] })
    );
    expect(children[0].children[0].type).toBe('html');
  });

  it('lifts a figure out of its wrapping paragraph', () => {
    const figure = { type: 'html', value: '\n<figure class="x">…</figure>' };
    expect(transform(paragraph(figure))).toEqual([figure]);
  });
});

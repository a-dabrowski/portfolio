import React from 'react';

const variantDictionary = {
  'h1': '',
  'h2': '',
  'h3': '',
  'h4': '',
  'h5': '',
  'h6': '',
  'subtitle': 'uppercase',
  'body-long': '',
  'body-short': '',
  'button': '',
  'display': '',
  'quote': '',
};

const Typography = ({as, variant, children}) => {
  const Component = React.createElement(as, { className: variantDictionary[variant] }, children);
  return Component;
};

export { Typography };
export default Typography;

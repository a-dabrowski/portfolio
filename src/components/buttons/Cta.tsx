import React, { PropsWithChildren } from 'react';

import './Cta.css';
const Cta = ({ children }: PropsWithChildren) => {
  return <button className="btn btn-cta">{children}</button>;
};

export default Cta;

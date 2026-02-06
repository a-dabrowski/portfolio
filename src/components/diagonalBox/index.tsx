import React, { PropsWithChildren } from 'react';
import './style.scss';

interface DiagonalBoxProps {
  skewContent?: boolean;
}

const DiagonalBox = ({
  skewContent,
  children,
}: PropsWithChildren<DiagonalBoxProps>) => {
  return (
    <div className="diagonal-container">
      <div
        className={`diagonal-container__content ${
          skewContent ? 'diagonal-container__content--skew' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DiagonalBox;

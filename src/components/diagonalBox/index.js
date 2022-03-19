import React from 'react';
import './style.scss';

const DiagonalBox = (props) => {
  return (
    <div class="diagonal-container">
      <div
        class={`diagonal-container__content ${
          props.skewContent ? 'diagonal-container__content--skew' : ''
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default DiagonalBox;

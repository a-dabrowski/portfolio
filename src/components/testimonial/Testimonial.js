import React from 'react';

import './Testimonial.css';

export default (props) => {
  return (
    <div className="testimonial">
      <h3 className="testimonial__title">
        Great one
        {props.title}
      </h3>
      <div className="testimonial__img">
        <img src={props.image} alt="Person" />
      </div>
      <p className="testionial__opinion">{props.opinion}</p>
    </div>
  );
};

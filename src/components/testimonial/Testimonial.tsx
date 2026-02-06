import React from 'react';

import './Testimonial.css';

interface TestimonialProps {
  title: string;
  image: string;
  opinion: string;
}

const Testimonial = (props: TestimonialProps) => {
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

export default Testimonial;

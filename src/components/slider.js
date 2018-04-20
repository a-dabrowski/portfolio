import React, { Component } from "react";
import Slider from "react-slick";

class CenterSlider extends Component {
  render() {
    const settings = {
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 5,
      autoplay: true,
      autoplayspeed: 1500,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '50px',
            slidesToShow: 1.5
          }
        }
      ]
    };
    return <Slider {...settings}>{this.props.children}</Slider>;
  }
}


export default CenterSlider;

import React, { Component } from 'react';
import { Cta } from '../../components/buttons';
import './GalleryItem.css';

export default class GalleryItem extends Component {
  render() {
    const { name, image, description } = this.props.data;
    return (
      <li className="subject">
        <h3 className="subject__title">{this.props.data.name}</h3>
        {image && (
          <div className="hero-image">
            <img src={this.props.data.image} alt="" />
          </div>
        )}
        <p className="subject__desc">{this.props.data.description}</p>
        <p className="subject__desc">{this.props.children}</p>
        <Cta>Więcej...</Cta>
      </li>
    );
  }
}

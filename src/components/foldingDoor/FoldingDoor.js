// name in working
import React, { Component } from "react";
import "./FoldingDoor.css";
export default class FoldingDoor extends Component {
  render() {
    const { title, description, image } = this.props;
    return (
      <div className="folding-door" style={{backgroundImage: `url(${image})`}}>
        {/*
          <img className="folding-door__image" src={image} />
          */}
        <h2 className="folding-door__title">{title}</h2>
        <p className="folding-door__desc">{description}</p>
      </div>
    );
  }

}


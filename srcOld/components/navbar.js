import React, { Component } from "react";
import Scrollchor from "react-scrollchor";
import "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className="menu">
          <li><Scrollchor to="#about">About</Scrollchor></li>
          <li><Scrollchor to="#projects">Projects</Scrollchor></li>
          <li><Scrollchor to="#technologies">Technology</Scrollchor></li>
          </ul>
          </nav>
      </div>
    );
  }
}

export default Navbar;
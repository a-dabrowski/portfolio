import React, { Component } from "react";
import Scrollchor from "react-scrollchor";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className="menu">
            {this.props.links.map(
              (e) => {
              let Icon = e.icon;
                return (
                  <li>
                    <Scrollchor to={`#${e.name}`}>
                      <span className="menu__link-text">{e.name}</span>
                      {Icon} 
                    </Scrollchor>
                  </li>
                )}
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;

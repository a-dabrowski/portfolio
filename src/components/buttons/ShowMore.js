import React, { Component } from 'react';
import './ShowMore.css';
class ShowMore extends Component {
state = {
  show: false
}

handleClick = () => {
  this.setState((state)=>({show: !state.show}));
}

render () {
  return (
    <div>
      {this.state.show ? this.props.children : ""}
      <button className="btn-show" onClick={this.handleClick}>{this.props.btnText}</button>
    </div>
  );
}
}

export default ShowMore;

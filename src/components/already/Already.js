import React, { Component } from 'react';

import './Already.css';

class Already extends Component {
  render() {
  const { number } = this.props;
    return (
      <div>
        { number } people already reserved
      </div>
    );
  };
};

export default Already;

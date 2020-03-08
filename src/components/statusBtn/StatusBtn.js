import React, {Component} from 'react';
import './StatusBtn.css';

class StatusBtn extends Component {
  state = {
    current: 'pay',
    styles: ['btn-status'],
    textStyle: ['btn-status__text'],
  };
 
  handleClick = (e) => {
    this.setState({current: 'proceeding', textStyle: [...this.state.textStyle, 'btn-status__text--switch']});
    e.preventDefault();
  }

  render() {
    const styles = this.state.styles.join(' ');
    const textStyles = this.state.textStyle.join(' ');

    return (
      <div>
        <button type="button" className={styles} onClick={this.handleClick} >
          <span className={textStyles}>{this.state.current}</span>
        </button>
      </div>
    );
  }
}


export default StatusBtn;

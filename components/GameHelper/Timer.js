import React, { Component } from 'react';

class Timer extends Component {
  render() {
    return (
      <div>
        {this.props.timeInGame}
      </div>
    );
  }
}

export default Timer;
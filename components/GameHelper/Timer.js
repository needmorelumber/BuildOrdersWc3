import React, { Component } from 'react';

class Timer extends Component {
  render() {
    const timeStamp=this.props.timeInGame.toTimeString().slice(0,8)
    return (
      <div>
        {timeStamp}
      </div>
    );
  }
}

export default Timer;
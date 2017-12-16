import React, { Component } from 'react';

class Timer extends Component {
  render() {
    const timeStamp=this.props.timeInGame.toTimeString().slice(0,8)
    return (
      <div className="container">
      <p className="subtitle is-4">Time in Game</p>
        <h1 className="title is-2">{timeStamp}</h1>
      </div>
    );
  }
}

export default Timer;
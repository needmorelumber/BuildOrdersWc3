import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      name: this.props.order.order.race_unit,
      max: this.props.max,
    };
  }

  componentDidMount() {
    const unit = this.props.order.order.race_unit;
    this.setState({
      timerInterval:
      window.setInterval(() => {
        // Check if done
        if (this.state.currentTime !== this.props.max) {
          this.setState({
            currentTime: this.state.currentTime + 1,
          });
        }
        // Done
        else {
          window.clearInterval(this.state.timerInterval);
          this.props.killTimer(this.props.index);
        }
      }, 1000),
    });
  }

  render() {
    return (
      <div>
        <p>Building...{this.state.name}</p>
        <progress className="progress is-primary" value={this.state.currentTime} max={this.state.max} />
      </div>
    );
  }
}

export default ProgressBar;

import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentTime: 0
    }
  }
  componentDidMount(){
    this.setState({
      timerInterval: 
      window.setInterval(() => {
        // Check if done
        console.log(this.state.currentTime)
        console.log(this.props.max)
        if (this.state.currentTime !== this.props.max) {
          this.setState({
            currentTime: this.state.currentTime + 1
          })
        } 
        // Done
        else {
          window.clearInterval(this.state.timerInterval);
          this.props.killTimer(this.props.index)
        }
      }, 1000)
    })
  }

  render() {    
    return (
      <progress className="progress is-primary" value={this.state.currentTime} max={this.props.max}>Building...</progress>
    );
  }
}

export default ProgressBar;
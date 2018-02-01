import React, { Component } from 'react';
import './custom.sass'

class LoadingPlaceholder extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
        <div className="rect6"></div>
        <div className="rect7"></div>
      </div>
    );
  }
}

export default LoadingPlaceholder;
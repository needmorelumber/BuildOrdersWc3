import React, { Component } from 'react';
import './loadingAnimation.sass';

class LoadingPlaceholder extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
        <div className="rect6" />
        <div className="rect7" />
      </div>
    );
  }
}

export default LoadingPlaceholder;

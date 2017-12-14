import React, { Component } from 'react';

class CurrentOrder extends Component {
  render() {
    return (
      <div>
        Current Order : {this.props.name}
      </div>
    );
  }
}

export default CurrentOrder;
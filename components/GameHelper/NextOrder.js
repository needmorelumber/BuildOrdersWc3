import React, { Component } from 'react';

class NextOrder extends Component {
  render() {
    return (
      <div>
        Next Order: {this.props.name}
      </div>
    );
  }
}

export default NextOrder;
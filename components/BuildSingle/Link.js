import React, { Component } from 'react';

class Link extends Component {
    render() {
        return (
            <div >
                {this.props.name}
            </div>
            
        );
    }
}

export default Link;
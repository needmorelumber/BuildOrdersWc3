import React, { Component } from 'react';
import './editbuild.sass';
import {updateCurrentOrder} from './../../actions/build'


class CurrentOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== undefined){
      this.setState({data: nextProps.data.order});
    }
  }
  
  render() {
    return (
      <div>
        <div className="panel currentOrder">
        <div className="panel-block">
        { this.state.data
          ?
          <div>
            <p>{this.state.data.race_unit}</p>
            <p>{this.state.data.notes}</p>
          </div>
          :
          null
        }
        </div>
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    data: state.currentVisibleBuild.currentOrder
  }
}


export default CurrentOrder;
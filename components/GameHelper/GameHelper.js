import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';

class GameHelper extends Component {
  constructor(props){
    super(props)
    this.state = {
      build_list: this.props.currentVisibleBuild.item.build.build_list,
      possInWalk: 0
    }
  }

  updateCurrentAndNextOrder() {
    // If first time init
    // Make the next order the current order
  }
  
  componentWillMount() {
    
  }
  
  findAndUpdateNextOrder(currIndex, buildList){
    this.setState({
      currentOrder: buildList[currIndex].order
    })
    for(let i = currIndex; i<buildList; i++){
      (buildList[i])
      if(buildList[i].order) {
        this.setState({
          nextOrder: buildList[i].order
        })
      }
    }
  }
  startWalkthrough(){

  }
  pauseWalkthrough(){
    window.clearInterval(this.state.timerInterval);
  }
  resetWalkthrough(){
    this.setState({
      possInWalk: 0
    })
  }
  render() {
    return (
      <div>
        <div>
          <Timer />
          <CurrentOrder />
          <NextOrder />
        </div>
        <div className="row">
          <button className="button is-dark" type="" onClick={()=>this.startWalkthrough()}>Start</button>
          <button className="button is-dark" type="" onClick={()=>this.pauseWalkthrough()}>Pause</button>
          <button className="button is-dark" type="" onClick={()=>this.resetWalkthrough()}>Reset</button>
        </div>
      </div>
    );
  }
}

export default GameHelper;
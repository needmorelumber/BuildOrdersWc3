import React, { Component } from 'react';

class GameHelper extends Component {
  constructor(props){
    super(props)
    this.state = {
      build_list: this.props.currentVisibleBuild.item.build.build_list,
      possInWalk: 0
    }
  }

  updateState() {
    // If first time init
    // Make the next order the current order
  }
  
  componentWillMount() {
    console.log(this.props)
  }
  
  findAndUpdateNextOrder(currIndex, buildList){
    this.setState({
      currentOrder: buildList[currIndex].order
    })
    for(let i = currIndex; i<buildList; i++){
      console.log(buildList[i])
      if(buildList[i].order) {
        this.setState({
          nextOrder: buildList[i].order
        })
        console.log('next order is')
        console.log(this.state.nextOrder)
      }
    }
    console.log(this.state.currentOrder)
    console.log(this.state.nextOrder)
  }
  startWalkthrough(){
    const timeline = this.state.build_list;
    let newTimeline = [];
          for (let i = 0; i < timeline.length; i++) {
              let order = timeline[i].order
              if (order === {} || order === undefined || order === null || !order) {
                  newTimeline.splice(i, 1);
                  i--;
              }
          }
    console.log(this.props.toggleEmpty)
    this.props.toggleEmpty(newTimeline);
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
      <div className="row">
        <button className="button is-dark" type="" onClick={()=>this.startWalkthrough()}>Start</button>
        <button className="button is-dark" type="" onClick={()=>this.pauseWalkthrough()}>Pause</button>
        <button className="button is-dark" type="" onClick={()=>this.resetWalkthrough()}>Reset</button>
      </div>
    );
  }
}

export default GameHelper;
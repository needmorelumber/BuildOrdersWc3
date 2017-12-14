import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';

class GameHelper extends Component {
  constructor(props){
    super(props)
    this.state = {
      build_list: this.props.currentVisibleBuild.item.build.build_list,
      possInWalk: false,
      currentOrder: false,
      nextOrder: false
    }
  }

  updateCurrentAndNextOrder() {
    // If first time init
    // Make the next order the current order
  }
  
  componentWillMount() {
    
  }
  getNextOrder(currIndex, buildList){
    // for(let i = currIndex; i<buildList; i++){
    //   console.log('here')
    //   if(buildList[i].order) {
    //     console.log(build_list[i].order)
    //     let nextOrder = buildList[i].order;
        this.setState({
          nextOrder: buildList[currIndex + 1].order
        })
    //   }
    // }
  }
  findAndUpdateNextOrder(currIndex, buildList){
    let order = buildList[currIndex].order;
    this.setState({
      currentOrder: order
    })
    let nextPostition = currIndex + 1;
    this.getNextOrder(currIndex, buildList)
    this.setState({possInWalk: nextPostition})
  }
  startWalkthrough(){
    let possInWalk = this.state.possInWalk;
    if(!possInWalk){
      this.setState({
        possInWalk: 0
      })
    }
    this.setState({
      timerInterval:
        window.setInterval(() => {
          let pos=this.state.possInWalk;
          let timeline=this.state.build_list;
          this.findAndUpdateNextOrder(pos, timeline);
        },1000)
    })
  }
  pauseWalkthrough(){
    window.clearInterval(this.state.timerInterval);
  }
  resetWalkthrough(){
    this.setState({
      currentOrder: false,
      nextOrder: false,
      possInWalk: false
    })
  }
  render() {
    return (
      <div>
        <div className="section row">
          {this.state.possInWalk  === true ? <Timer timeInGame={this.state.possInWalk + 1}/> : null}
          {this.state.currentOrder ? <CurrentOrder name={this.state.currentOrder.race_unit} /> : null}
          {this.state.nextOrder ? <NextOrder name={this.state.nextOrder.race_unit}/> : null}
        </div>
      {
        this.props.isEdit === false 
        ? 
          <div className="section row">
            <button className="button is-dark" type="" onClick={()=>this.startWalkthrough()}>Start</button>
            <button className="button is-dark" type="" onClick={()=>this.pauseWalkthrough()}>Pause</button>
            <button className="button is-dark" type="" onClick={()=>this.resetWalkthrough()}>Reset</button>
          </div>
        : 
          <p>View the whole Timeline to start timer</p>
      }
      </div>
    );
  }
}

export default GameHelper;
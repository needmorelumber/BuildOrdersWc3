import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';

class GameHelper extends Component {
  constructor(props){
    super(props)
    this.state = {
      build_list: this.props.justOrders,
      totalLength: this.props.totalLength,
      build_map: this.mapOrdersIntoObjectForTimer(this.props.justOrders),
      curPos: 0,
      currentOrder: false,
      nextOrder: false,
      timeStampSeconds: new Date(0,0,0,0,0,0,0).toTimeString()
    }
  }
  mapOrdersIntoObjectForTimer(justOrders){
    let mapToReturn={};
    for(let i=0; i<justOrders.length; i++){
      let second=justOrders[i].second;
      if(!mapToReturn[second]){
        mapToReturn[second]=justOrders[i]
      }
    }
    return mapToReturn;
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
    this.setState({
      timerInterval:
        window.setInterval(() => {
          let curpos=this.state.curPos
          if(this.state.build_map[curpos]){
            let order = this.state.build_map[curpos];
          }
          this.setState({
            curPos : curpos + 1
          })
          console.log('here')
        }, 1000)
    })
    console.log(this.state.totalLength)
    console.log(this.state.timeStampSeconds)
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
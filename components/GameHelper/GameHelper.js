import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';
import AddOrder from './../BuildSingle/AddOrder';

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
      ownedByLooker: true,
      timeStampSeconds: new Date(0,0,0,0,0,0,0)
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
            curPos : curpos + 1,
            timeStampSeconds: new Date(0,0,0,0,0,curpos+1,0)
          })
          console.log('here')
        }, 1000)
    })
  }
  pauseWalkthrough(){
    window.clearInterval(this.state.timerInterval);
  }
  resetWalkthrough(){
    this.setState({
      currentOrder: false,
      nextOrder: false,
      possInWalk: false,
      curPos: 0,
      timeStampSeconds: new Date(0,0,0,0,0,0,0)
    })
  }
  render() {
    return (
      this.state.ownedByLooker === true
      ?
      <div>
      {
        this.props.isEdit === false 
        ? 
          <div className="row">
            <button className="button is-dark" type="" onClick={()=>this.startWalkthrough()}>Start</button>
            <button className="button is-info" type="" onClick={()=>this.pauseWalkthrough()}>Pause</button>
            <button className="button is-warning" type="" onClick={()=>this.resetWalkthrough()}>Reset</button>
          </div>
        : 
          <p>View the whole Timeline to start timer</p>
      }
        <div className="row">
          {this.state.curPos ? <Timer timeInGame={this.state.timeStampSeconds}/> : null}
          {this.state.currentOrder ? <CurrentOrder name={this.state.currentOrder.race_unit} /> : null}
          {this.state.nextOrder ? <NextOrder name={this.state.nextOrder.race_unit}/> : null}
        </div>
        <AddOrder />
      </div>
      :
      <div>
        You can't edit this build.
        <p>add button that loads this build into new build with curr user as owner</p>
      </div>
      
    );
  }
}

export default GameHelper;
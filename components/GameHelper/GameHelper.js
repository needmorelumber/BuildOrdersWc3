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
      race: this.props.currentVisibleBuild.item.build.race,
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
    this.props.fetchById(this.props.id);
    this.setState({
      currentlyTicking: true
    })
    this.setState({
      timerInterval:
        window.setInterval(() => {
          let curpos=this.state.curPos
          if(curpos === this.state.totalLength) {
            window.clearInterval(this.state.timerInterval)
          }
          if(this.state.build_map[curpos]){
            let order = this.state.build_map[curpos];
            this.setState({
              currentOrder: order.order
            })
          }
          this.setState({
            curPos : curpos + 1,
            timeStampSeconds: new Date(0,0,0,0,0,curpos,0)
          })
        }, 1000)
    })
  }
  pauseWalkthrough(){
    this.setState({
      currentlyTicking: false
    })
    window.clearInterval(this.state.timerInterval);
  }
  checkOwnership(){

  }
  resetWalkthrough(){
    this.setState({
      currentOrder: false,
      nextOrder: false,
      possInWalk: false,
      currentlyTicking: false,
      curPos: 0,
      timeStampSeconds: new Date(0,0,0,0,0,0,0)
    })
    window.clearInterval(this.state.timerInterval);
  }
  render() {
    return (
      this.state.ownedByLooker === true
      ?
      <div>
        <div className="row">
            {this.state.curPos ? <Timer timeInGame={this.state.timeStampSeconds}/> : null}  
            {this.state.currentOrder ? <CurrentOrder race={this.state.race} currentOrder={this.state.currentOrder} /> : null}
            {this.state.nextOrder ? <NextOrder name={this.state.nextOrder.race_unit}/> : null}
        </div>
      {
        this.props.isEdit === false 
        ? 
          <div className="row level">
            <div className="level-left">
            { !this.state.currentlyTicking
            ? 
            <div>
              <button className="button is-dark level-item" type="" onClick={()=>this.startWalkthrough()}>Start</button>
            </div>
            :
            <div>
              <button className="button is-info level-item" type="" onClick={()=>this.pauseWalkthrough()}>Pause</button>   
            </div>
            }
            <button className="button is-warning level-item" type="" onClick={()=>this.resetWalkthrough()}>Reset</button>
            </div>
          </div>
        : 
          <p>View the whole Timeline to start timer</p>
      }
        <AddOrder addOrder={this.props.addOrder} id={this.props.id} fetchById={this.props.fetchById}/>
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
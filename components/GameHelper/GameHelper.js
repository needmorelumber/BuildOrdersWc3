import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';
import AddOrder from './../BuildSingle/AddOrder';
import LoadingPlaceholder from './../loadingAnimation';

class GameHelper extends Component {
  constructor(props){
    super(props)
    this.state = {
      build_map: this.mapOrdersIntoObjectForTimer(this.props.justOrders),
      curPos: 0,
      currentOrder: false,
      nextOrder: false,
      ownedByLooker: false,
      justOrders: [],
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
          if(curpos === this.props.totalLength) {
            window.clearInterval(this.state.timerInterval)
          }
          if(this.state.build_map[curpos]){
            let newOrders = this.props.justOrders.splice(0, 1);
            let order = this.state.build_map[curpos];
            this.setState({
              currentOrder: order.order,
              justOrders: newOrders
            })
          }
          this.setState({
            curPos : curpos + 1,
            nextOrder: this.state.justOrders[1],
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
    if(this.props.userState.user && this.props.currentVisibleBuild.item.build){
    let user = this.props.userState.user.user;
    let build = this.props.currentVisibleBuild.item.build;
    if(this.state.currentlyTicking){
      return (
        <div>
         <Timer timeInGame={this.state.timeStampSeconds}/>
          <div className="columns">
                <CurrentOrder race={this.props.currentVisibleBuild.item.build.race} currentOrder={this.state.currentOrder} />
                <NextOrder race={this.props.currentVisibleBuild.item.build.race} currentOrder={this.state.nextOrder}/> 
          </div>
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
        </div>
      )
    }
    return (
      user._id == build.ownerId
      ?
      <div>
      {
        this.props.isEdit === false 
        ? 
        <div className="rows">
          <div className="row">
            <button className="button is-block is-large is-dark level-item" onClick={()=>this.startWalkthrough()}>Start In Game walkthrough!</button>
          </div>
          <div className="row">
            <AddOrder addOrder={this.props.addOrder} id={this.props.id} fetchById={this.props.fetchById}/>
          </div>
        </div>
        : 
          <p>View the whole Timeline to start timer</p>
      }
      </div>
      :
      <div>
       <div className="row level">
            <div className="level-left">
            { !this.state.currentlyTicking
            ? 
            <div>
              <button className="button is-block is-large is-dark level-item" onClick={()=>this.startWalkthrough()}>Start In Game walkthrough!</button>
            </div>
            :
            <div>
              <button className="button is-info level-item" type="" onClick={()=>this.pauseWalkthrough()}>Pause</button>   
            </div>
            }
            </div>
      </div>
      <div className="container section content">
        <h3> Created by {this.props.currentVisibleBuild.item.build.ownerUsername} </h3>
      </div>
      </div>
    );
    } else {
      return (
        <LoadingPlaceholder />
      )
    }
  }
}

export default GameHelper;
import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';
import AddOrder from './../BuildSingle/AddOrder';
import LoadingPlaceholder from './../loadingAnimation';

class GameHelper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      build_map: this.mapOrdersIntoObjectForTimer(this.props.justOrders),
      curPos: 0,
      currentOrder: false,
      nextOrder: false,
      ownedByLooker: false,
      orderDifference: 0,
      timeStampSeconds: new Date(0, 0, 0, 0, 0, 0, 0)
    }
  }
  mapOrdersIntoObjectForTimer(justOrders) {
    let mapToReturn = {};
    for (let i = 0; i < justOrders.length; i++) {
      let second = justOrders[i].second;
      if (!mapToReturn[second]) {
        mapToReturn[second] = justOrders[i]
      }
    }
    return mapToReturn;
  }
  findAndUpdateNextOrder(currIndex) {
    const orders = this.props.justOrders;
    const currentOrder = this.props.justOrders[currIndex];
    const nextOrder = this.props.justOrders[currIndex + 1];
    let difference = 0;
    if(nextOrder && currentOrder){
      console.log(nextOrder)
      difference = nextOrder.order.time - currentOrder.order.time;
    }
    this.setState({
      currentOrder: currentOrder,
      nextOrder: nextOrder,
      orderDifference: difference
    })
  }
  startWalkthrough() {
    console.log(this.props)
    this.props.fetchById(this.props.id);
    this.setState({
      currentlyTicking: true
    })
    this.setState({
      timerInterval:
      window.setInterval(() => {
        let curpos = this.state.curPos
        if (curpos === this.props.totalLength) {
          console.log(this.props.totalLength)
          window.clearInterval(this.state.timerInterval)
        }
        if (this.state.build_map[curpos]) {
          this.findAndUpdateNextOrder(curpos);
        }
        this.setState({
          curPos: curpos + 1,
          timeStampSeconds: new Date(0, 0, 0, 0, 0, curpos, 0)
        })
      }, 1000)
    })
  }
  pauseWalkthrough() {
    this.setState({
      currentlyTicking: false
    })
    window.clearInterval(this.state.timerInterval);
  }
  resetWalkthrough() {
    this.setState({
      currentOrder: false,
      nextOrder: false,
      possInWalk: false,
      currentlyTicking: false,
      curPos: 0,
      timeStampSeconds: new Date(0, 0, 0, 0, 0, 0, 0)
    })
    window.clearInterval(this.state.timerInterval);
  }
  render() {
    if (this.props.userState.user && this.props.currentVisibleBuild.item.build) {
      let user = this.props.userState.user.user;
      let build = this.props.currentVisibleBuild.item.build;
      if (this.state.currentlyTicking) {
        return (
          <div>
            <Timer timeInGame={this.state.timeStampSeconds} />
            <div className="columns">
              <div className="columns">
                <CurrentOrder race={this.props.currentVisibleBuild.item.build.race} currentOrder={this.state.currentOrder} />
                <NextOrder difference={this.state.orderDifference}race={this.props.currentVisibleBuild.item.build.race} currentOrder={this.state.nextOrder} />
              </div>
              <div className="row level">
                <div className="level-left">
                  {!this.state.currentlyTicking
                    ?
                    <div>
                      <button className="button is-dark level-item" type="" onClick={() => this.startWalkthrough()}>Start</button>
                    </div>
                    :
                    <div>
                      <button className="button is-info level-item" type="" onClick={() => this.pauseWalkthrough()}>Pause</button>
                    </div>
                  }
                  <button className="button is-warning level-item" type="" onClick={() => this.resetWalkthrough()}>Reset</button>
                </div>
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
                <div className="columns">
                  <div className="column container section">
                    <button className="button is-block is-large is-dark level-item" onClick={() => this.startWalkthrough()}>Start In Game walkthrough!</button>
                  </div>
                  <div className="column">
                    <p className="subtitle">This is your build, edit it here.</p>
                    <AddOrder addOrder={this.props.addOrder} id={this.props.id} fetchById={this.props.fetchById} />
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
                {!this.state.currentlyTicking
                  ?
                  <div>
                    <button className="button is-block is-large is-dark level-item" onClick={() => this.startWalkthrough()}>Start In Game walkthrough!</button>
                  </div>
                  :
                  <div>
                    <button className="button is-info level-item" type="" onClick={() => this.pauseWalkthrough()}>Pause</button>
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
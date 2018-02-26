import React, { Component } from 'react';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';
import AddOrder from './../BuildSingle/AddOrder';
import LoadingPlaceholder from './../loadingAnimation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './gamehelper.sass';

class GameHelper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curPos: 0,
      currentOrder: false,
      nextOrder: false,
      ownedByLooker: false,
      orderDifference: 0,
      ordersSeen: 0,
      timeStampSeconds: new Date(0, 0, 0, 0, 0, 0, 0)
    }
  }
  
  componentWillMount() {
    this.props.fetchById(this.getIdFromPathname()); 
  }
  componentWillUnmount() {
    if(this.state.timerInterval){
      window.clearInterval(this.state.timerInterval)
    }
  }
  
  getIdFromPathname(){
      return(this.props.match.params.id);
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
  findAndUpdateNextOrder(currIndex, build_map) {
    const ordersArray = this.props.justOrders;
    const allSecondsArray = this.props.currentVisibleBuild.item.build.build_list;
    if (allSecondsArray[currIndex].order.race_unit) {
      let currentOrder = allSecondsArray[currIndex];
      const dataOfUnitFromMap = build_map[currIndex]
      const newOrderCount = this.state.ordersSeen;
      if (ordersArray[newOrderCount + 1]) {
        let nextOrder = ordersArray[newOrderCount + 1];
        if (nextOrder.order) {
          this.setState({
            nextOrder: nextOrder
          })
        } 
      } else {
        this.setState({ nextOrder: false })
      }
      if (currentOrder.order) {
        this.setState({ currentOrder: currentOrder })
      }
      this.setState({
        ordersSeen: newOrderCount + 1,
      })
    }
  }
  
  startWalkthrough() {
    const build_map = this.mapOrdersIntoObjectForTimer(this.props.currentVisibleBuild.item.build.build_list);
    this.setState({
      currentlyTicking: true,
      nextOrder: this.props.justOrders[0]
    })
    this.setState({
      timerInterval:
      //EVERY SECOND THIS HAPPENS
      window.setInterval(() => {
        let curpos = this.state.curPos
        if (curpos === this.props.totalLength) {
          this.resetWalkthrough()
        }
        if (this.props.currentVisibleBuild.item.build.build_list[curpos]) {
          this.findAndUpdateNextOrder(curpos, build_map);
        }
        this.setState({
          curPos: curpos + 1,
          timeStampSeconds: new Date(0, 0, 0, 0, 0, curpos + 1, 0)
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
      nextOrder: this.props.justOrders[0],
      possInWalk: false,
      currentlyTicking: false,
      curPos: 0,
      ordersSeen: 0,
      timeStampSeconds: new Date(0, 0, 0, 0, 0, 0, 0)
    })
    window.location.reload()
    window.clearInterval(this.state.timerInterval);
  }
  render() {
    if (this.props.currentVisibleBuild.item.build) {
      let user = this.props.userState.user.user;
      let build = this.props.currentVisibleBuild.item.build;
        return (
          <div className="container has-text-centered">
            <Timer timeInGame={this.state.timeStampSeconds} />
             <div className="level section column">
                <div className="level-left">
                  {!this.state.currentlyTicking
                    ?
                    <div>
                      <button className="button is-info level-item" type="" onClick={() => this.startWalkthrough()}>Start</button>
                    </div>
                    :
                    <div>
                      <button className="button is-info level-item" type="" onClick={() => this.pauseWalkthrough()}>Pause</button>
                    </div>
                  }
                  <button className="button is-warning level-item" type="" onClick={() => this.resetWalkthrough()}>Reset</button>
                </div>
              </div>
              <div className="columns is-vcentered">
                <div className="column is-6">
                <p>Build right now...</p>
                  <CurrentOrder 
                    race={this.props.currentVisibleBuild.item.build.race} 
                    currentOrder={this.state.currentOrder} />
                </div>
                <div className="column is-6">
                <p>Upcoming...</p>
                  <NextOrder 
                    pos={this.state.curPos} 
                    race={this.props.currentVisibleBuild.item.build.race} 
                    currentOrder={this.state.nextOrder} />
                </div>
            </div>
          </div>
        )
      } else {
        return (
          <LoadingPlaceholder />
        )
    }
  }
}

export default GameHelper;
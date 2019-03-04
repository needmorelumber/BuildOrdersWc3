import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Timer from './Timer';
import NextOrder from './NextOrder';
import CurrentOrder from './CurrentOrder';
import AddOrder from '../BuildSingle/AddOrder';
import LoadingPlaceholder from '../loadingAnimation/loadingAnimation';
import ProgressBar from './ProgressBar';
import data from '../../MasterData';
import './gamehelper.sass';

class GameHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curPos: 0,
      currentOrderBuildSecond: 0,
      currentOrder: false,
      nextOrder: false,
      ownedByLooker: false,
      orderDifference: 0,
      ordersSeen: 0,
      timeStampSeconds: new Date(0, 0, 0, 0, 0, 0, 0),
      progressBars: [],
    };
  }

  componentWillMount() {
    this
      .props
      .fetchById(this.getIdFromPathname());
  }

  componentWillUnmount() {
    if (this.state.timerInterval) {
      window.clearInterval(this.state.timerInterval);
    }
  }

  startNewProgressBar(max) {
    const newBar = {
      max,
    };
    this.state.progressBars.push(newBar);
  }

  killProgressBar(index) {
    const newBars = this.state.progressBars;
    newBars.splice(index, 1);
    console.log(newBars);
    this.setState({
      progressBars: newBars,
    });
  }

  getIdFromPathname() {
    return (this.props.match.params.id);
  }

  mapOrdersIntoObjectForTimer(justOrders) {
    const mapToReturn = {};
    for (let i = 0; i < justOrders.length; i++) {
      const { second } = justOrders[i];
      if (!mapToReturn[second]) {
        mapToReturn[second] = justOrders[i];
      }
    }
    return mapToReturn;
  }

  findAndUpdateNextOrder(currIndex, build_map) {
    const ordersArray = this.props.justOrders;
    const allSecondsArray = this.props.currentVisibleBuild.item.build.build_list;
    if (allSecondsArray[currIndex].order.race_unit) {
      const currentOrder = allSecondsArray[currIndex];
      const dataOfUnitFromMap = build_map[currIndex];
      const newOrderCount = this.state.ordersSeen;
      if (ordersArray[newOrderCount + 1]) {
        const nextOrder = ordersArray[newOrderCount + 1];
        if (nextOrder.order) {
          this.setState({ nextOrder });
        }
      } else {
        this.setState({ nextOrder: false });
      }
      if (currentOrder.order) {
        const { race } = this.props.currentVisibleBuild.item.build;
        const { race_unit } = currentOrder.order;
        const unitData = data[race][race_unit] || { ...data['N/A'], Unit: order.order.race_unit };
        // this.startNewProgressBar(parseInt(unitData["Build Time"]))
        this.setState({
          unitData,
          currentOrder,
          currentOrderBuildSecond: 0,
        });
      }
      this.setState({
        ordersSeen: newOrderCount + 1,
      });
    }
  }

  startWalkthrough() {
    const build_map = this.mapOrdersIntoObjectForTimer(this.props.currentVisibleBuild.item.build.build_list);
    if (!this.state.nextOrder) {
      this.setState({ currentlyTicking: true, nextOrder: this.props.justOrders[0] });
    } else {
      this.setState({ currentlyTicking: true });
    }
    this.setState({
      timerInterval:
      // EVERY SECOND THIS HAPPENS
      window.setInterval(() => {
        if (this.state.currentlyTicking) {
          const curpos = this.state.curPos;
          if (curpos === this.props.totalLength) {
            this.resetWalkthrough();
          }
          if (this.props.currentVisibleBuild.item.build.build_list[curpos]) {
            this.findAndUpdateNextOrder(curpos, build_map);
          }
          this.setState({
            curPos: curpos + 1,
            currentOrderBuildSecond: this.state.currentOrderBuildSecond + 1,
            timeStampSeconds: new Date(0, 0, 0, 0, 0, curpos + 1, 0),
          });
        }
      }, 1000),
    });
  }

  pauseWalkthrough() {
    this.setState({ currentlyTicking: false });
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
      timeStampSeconds: new Date(0, 0, 0, 0, 0, 0, 0),
    });
    window
      .location
      .reload();
    window.clearInterval(this.state.timerInterval);
  }

  render() {
    if (this.props.currentVisibleBuild.item.build) {
      const { user } = this.props.userState.user;
      const { build } = this.props.currentVisibleBuild.item;
      const bars = this.state.progressBars.map((bar, index) => (
        <ProgressBar max={bar.max} killTimer={() => this.killProgressBar()} key={index} index={index} order={this.state.currentOrder} />
      ));
      return (
        <div className="section">
          <Timer timeInGame={this.state.timeStampSeconds} />
          <div className="column">
            <div className="buttons">
              {!this.state.currentlyTicking
                ? (
                  <div className="buttonContainer">
                    <button
                      className="button cbutton is-info level-item"
                      type=""
                      onClick={() => this.startWalkthrough()}
                    >
                      <span className="icon">
                        <i className="fa fa-play" />
                      </span>
                    </button>
                  </div>
                )
                : (
                  <div className="buttonContainer">
                    <button
                      className="button cbutton is-info level-item"
                      type=""
                      onClick={() => this.pauseWalkthrough()}
                    >
                      <span className="icon">
                        <i className="fa fa-pause" />
                      </span>
                    </button>
                  </div>
                )
              }
              <button
                className="button cbutton is-warning level-item"
                type=""
                onClick={() => this.resetWalkthrough()}
              >
                <span className="icon">
                  <i className="fa fa-repeat" />
                </span>
              </button>
            </div>
          </div>
          <div className="columns is-mobile orderContainer level">
            <div className="column is-6 level-item">
              <p>Build right now...</p>
              <CurrentOrder
                race={this.props.currentVisibleBuild.item.build.race}
                currentOrder={this.state.currentOrder}
              />
            </div>
            <div className="column is-6 level-item">
              <p>Upcoming...</p>
              <NextOrder
                pos={this.state.curPos}
                race={this.props.currentVisibleBuild.item.build.race}
                currentOrder={this.state.nextOrder}
              />
            </div>
          </div>
          { this.state.currentOrder
            ? bars
            : null
          }
        </div>
      );
    }
    return (<LoadingPlaceholder />);
  }
}

export default GameHelper;

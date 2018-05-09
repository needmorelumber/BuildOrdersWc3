import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoadingPlaceholder from './../../components/loadingAnimation/loadingAnimation';
import Timeline from './../Timeline/Timeline';
import AddOrder from './../BuildSingle/AddOrder';
import TimelineControls from './TimelineControls';
import {StickyContainer, Sticky} from 'react-sticky';
import ReactTooltip from 'react-tooltip'
import './editbuild.sass';

class EditBuild extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: this.props.userState.user.user,
      build: this.props.currentVisibleBuild.item.build,
      redirectFlag: false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      user: nextProps.userState.user.user,
      build: nextProps.currentVisibleBuild.item.build,
      currentOrder: null
    })
    if(nextProps.currentVisibleBuild.item.build && nextProps.userState.user.user){
      if (nextProps.currentVisibleBuild.item.build.ownerId !== nextProps.userState.user.user._id) {
        this.setState({
          redirectFlag: true
        })
      }
    }
  }
  componentWillUnmount() {
    this.setState({
      redirectFlag: false
    })
  }
  
  componentDidMount() {
    this.props.fetchById(this.props.match.params.id);
    this.setState({
      currentOrder: null,
      build: this.props.currentVisibleBuild.item.build,
      user: this.props.userState.user.user
    })
  }
  render() {
    if(this.state.redirectFlag === true){
       return(
        <Redirect to='/builds'/>
       )
    }
    const isToggled = this.props.currentVisibleBuild.isToggledOrders,
          toggleEmpty = this.props.toggleEmpty,
          restoreBuild = this.props.restoreBuild,
          removeItem = this.props.removeItem,
          addMinute = this.props.addMinute,
          removeMinute = this.props.removeMinute,
          toggleOrder = this.props.toggleAddingOrder,
          updateOrder = this.props.updateOrder,
          order = this.props.currentVisibleBuild.currentOrder,
          isAdding = this.props.isAdding
      return (
        <div className="">
        { this.state.build
        ?
          <div className=" columns is-mobile">
            <div className={isAdding
              ? "column is-3 timelineContainer"
              : "column is-12 timelineContainer"}>

              <Timeline
                className="timelineContainer" 
                build={this.props.currentVisibleBuild.item.build }
                fetchById={this.props.fetchById}
                editing={true}
                updateOrder={updateOrder}
                removeItem={removeItem}
                toggleAddingOrder={toggleOrder}
                isAdding={isAdding}/>
            </div>
            <StickyContainer
              className={isAdding
              ? "column is-9 addOrderContainer"
              : "column is-0 addOrderContainer"}>
              <Sticky >
                {({
                  style,
                  isSticky,
                  wasSticky,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight,
                  topOffset
                }) => {
                  return (
                    <div style={style} className="addOrder">
                     <TimelineControls
                      toggleEmpty={toggleEmpty}
                      isToggled={isToggled}
                      restoreBuild={restoreBuild}
                      addMinute={addMinute}
                      removeMinute={removeMinute}/>
                      {isAdding
                        ? <AddOrder updateBuild={this.props.updateBuild}/>
                        : null
                      }
                    </div>
                    )
                  } 
              }
              </Sticky>
            </StickyContainer>
          </div>
          :
          <LoadingPlaceholder />
          }
        </div>
        
      );
  }
}

export default EditBuild;
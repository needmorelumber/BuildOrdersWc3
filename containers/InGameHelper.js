import { connect } from 'react-redux'
import GameHelper from './../components/GameHelper/GameHelper'
import { updateBuildById,fetchBuildById, toggleEmpty, fetchAndUpdateUser } from './../actions/actions'


const returnJustOrders=(buildList)=>{
  if(buildList){
  let newTimeline = [];
      for (let i = 0; i < buildList.length; i++) {
          let order = buildList[i].order;
          if(order){
              newTimeline.push(buildList[i])
          }
      }
    return newTimeline
  }
}

const mapStateToProps = (state) => {
  return {
    currentVisibleBuild: state.currentVisibleBuild,
    userState: state.userState,
    justOrders: returnJustOrders(state.currentVisibleBuild.item.build.build_list),
    totalLength: state.currentVisibleBuild.item.build.build_list ? state.currentVisibleBuild.item.build.build_list.length : null
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      fetchById: id => {
        dispatch(fetchBuildById(id))
      },
      updateBuild: (build, id) => {
        dispatch(updateBuildById(build, id))
      },
      toggleEmpty: (build) => {
        dispatch(toggleEmpty(build))
      },
      fetchAndUpdateUser: (user) => {
        dispatch(fetchAndUpdateUser(user))
      }

}
}

const InGameHelper = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameHelper)

export default InGameHelper;
import { connect } from 'react-redux'
import GameHelper from './../components/GameHelper/GameHelper'
import { updateBuildById,fetchBuildById, toggleEmpty, fetchAndUpdateUser } from './../actions/actions'

const mapStateToProps = (state) => {
  return {
    currentVisibleBuild: state.currentVisibleBuild,
    userState: state.userState
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
import { connect } from 'react-redux'
import GameHelper from './../components/GameHelper/GameHelper'
import { updateBuildById,fetchBuildById, toggleEmpty } from './../actions/actions'

const mapStateToProps = (state) => {
  return {
    currentVisibleBuild: state.currentVisibleBuild
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
      }

}
}

const InGameHelper = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameHelper)

export default InGameHelper;
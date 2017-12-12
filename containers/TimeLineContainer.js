import { connect } from 'react-redux'
import BuildSingle from './../components/BuildSingle/BuildSingle'
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

const TimeLineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildSingle)

export default TimeLineContainer;
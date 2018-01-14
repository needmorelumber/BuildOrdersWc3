import { connect } from 'react-redux'
import {fetchAndUpdateUser }from './../actions/user'
import { fetchBuildById, toggleEmpty, restoreBuild, updateBuildById, addMinute }from './../actions/build'
import EditBuild from '../components/EditBuild/EditBuild'

const mapStateToProps = (state) => {
  return {
    currentVisibleBuild: state.currentVisibleBuild,
    userState: state.userState
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    fetchById: id => {
      dispatch(fetchBuildById(id))
    },
    fetchAndUpdateUser: () => {
      dispatch(fetchAndUpdateUser())
    },
    updateBuild: (build, id) => {
      dispatch(updateBuildById(build, id))
    },
    toggleEmpty: (build) => {
      dispatch(toggleEmpty(build))
    },
    restoreBuild: () => {
      dispatch(restoreBuild())
    },
    addMinute: () => {
      dispatch(addMinute())
    }

  }
}

const EditBuildPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBuild)

export default EditBuildPage;
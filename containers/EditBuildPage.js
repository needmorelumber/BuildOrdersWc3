import { connect } from 'react-redux'
import {fetchAndUpdateUser }from './../actions/user'
import { fetchBuildById, toggleEmpty, restoreBuild, updateBuildById, addMinuteApi, removeItem }from './../actions/build'
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
    addMinute: (build, id) => {
      dispatch(addMinuteApi(build, id))
    },
    removeItem: (build, id, index) => {
      if(build[index].order){
        build[index].order = {};
        dispatch(updateBuildById(build, id));
      }
    }

  }
}

const EditBuildPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBuild)

export default EditBuildPage;
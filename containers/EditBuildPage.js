import { connect } from 'react-redux'
import { fetchBuildById,fetchAndUpdateUser,updateBuildById,toggleEmpty }from './../actions/actions'
import EditBuild from '../components/EditBuild/EditBuild'

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
    fetchAndUpdateUser: () => {
      dispatch(fetchAndUpdateUser())
    },
    updateBuild: (build, id) => {
      dispatch(updateBuildById(build, id))
    },
    toggleEmpty: (build) => {
      dispatch(toggleEmpty(build))
    }

  }
}

const EditBuildPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBuild)

export default EditBuildPage;
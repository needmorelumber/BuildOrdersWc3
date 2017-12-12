import { connect } from 'react-redux'
import {requestBuilds,fetchBuildById }from './../actions/actions'
import PreviewBuild from '../components/PreviewBuild'

const mapStateToProps = (state) => {
  return {
    currentVisibleBuild: state.currentVisibleBuild
  }
}
const mapDispatchToProps = (state) => {
  return {
    fetchById: id => {
      dispatch(fetchBuildById(id))
    }
  }
}

const CurrentBuild = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewBuild)

export default CurrentBuild;
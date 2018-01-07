import { connect } from 'react-redux'
import {requestBuilds, fetchBuildById, fetchBuilds} from './../actions/build'
import BuildList from '../components/BuildList/BuildList'



const mapStateToProps = (state) => {
  return {
    ...state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onBuildClick: id => {
      dispatch(fetchBuildById(id))
    },
    fetchBuilds: () => {
      dispatch(fetchBuilds())
    }
    
  }
}

const VisibleBuilds = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildList)

export default VisibleBuilds
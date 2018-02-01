import { connect } from 'react-redux'
import {fetchAndUpdateUser} from './../actions/user'
import User from './../components/UserProfile/User'



const mapStateToProps = (state) => {
  return {
    ...state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAndUpdateUser: () => {
      dispatch(fetchAndUpdateUser())
    },
    
  }
}

const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserPage
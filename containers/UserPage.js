import { connect } from 'react-redux'
import {fetchAndUpdateUser, deleteUser} from './../actions/user'
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
    deleteUser: (password, id) => {
      dispatch(deleteUser(password, id))
    }
  }
}

const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserPage
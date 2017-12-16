import { connect } from 'react-redux'
import { registerNewUser } from './../actions/actions'
import Register from '../components/Register/Register';

const mapStateToProps = (state) => {
  return {
    register: state.register
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerNewUser: user => {
      dispatch(registerNewUser(user))
    }
  }
}

const RegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default RegisterPage;
import { connect } from 'react-redux'
import { loginToServer,updateLoginMessage } from './../actions/actions'
import Login from '../components/Login/Login';

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginToServer: user => {
      dispatch(loginToServer(user))
    },
    updateLoginMessage: message => {
      dispatch(updateLoginMessage(message))
    }
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginPage;
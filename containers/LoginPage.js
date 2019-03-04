import { connect } from 'react-redux';
import { loginToServer, updateLoginMessage, updateLoginMessageTimed } from '../actions/user';
import Login from '../components/Login/Login';

const mapStateToProps = state => ({
  login: state.login,
});
const mapDispatchToProps = dispatch => ({
  loginToServer: user => {
    dispatch(loginToServer(user));
  },
  updateLoginMessage: (message, time) => {
    dispatch(updateLoginMessageTimed(message, time));
  },
});

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginPage;

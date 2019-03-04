import { connect } from 'react-redux';
import { registerNewUser, updateRegMessage, updateRegMessageTimed } from '../actions/user';
import Register from '../components/Register/Register';

const mapStateToProps = state => ({
  register: state.register,
});
const mapDispatchToProps = dispatch => ({
  registerNewUser: user => {
    dispatch(registerNewUser(user));
  },
  updateRegMessage: message => {
    dispatch(updateRegMessageTimed(message));
  },
});

const RegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterPage;

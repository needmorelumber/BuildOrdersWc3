import { connect } from 'react-redux';
import { fetchAndUpdateUser, deleteUser, changeUsername } from '../actions/user';
import { deleteBuild } from '../actions/build';
import User from '../components/UserProfile/User';


const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  fetchAndUpdateUser: () => {
    dispatch(fetchAndUpdateUser());
  },
  deleteUser: (password, id) => {
    dispatch(deleteUser(password, id));
  },
  changeUsername: (id, username) => {
    dispatch(changeUsername(id, username));
  },
  deleteBuildOrder: id => dispatch(deleteBuild(id)),
});

const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);

export default UserPage;

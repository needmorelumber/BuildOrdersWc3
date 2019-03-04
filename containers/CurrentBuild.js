import { connect } from 'react-redux';
import { requestBuilds, fetchBuildById } from '../actions/build';
import PreviewBuild from '../components/PreviewBuild/PreviewBuild';

const mapStateToProps = state => ({
  currentVisibleBuild: state.currentVisibleBuild,
});
const mapDispatchToProps = (state, dispatch) => ({
  fetchById: id => {
    dispatch(fetchBuildById(id));
  },
});

const CurrentBuild = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreviewBuild);

export default CurrentBuild;

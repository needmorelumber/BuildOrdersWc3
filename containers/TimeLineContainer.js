import { connect } from 'react-redux';
import BuildSingle from '../components/BuildSingle/BuildSingle';
import { updateBuildById, fetchBuildById, toggleEmpty, updateCurrentOrder, toggleAddingOrder } from '../actions/build';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  fetchById: id => {
    dispatch(fetchBuildById(id));
  },
  updateBuild: (build, id) => {
    dispatch(updateBuildById(build, id));
  },
  toggleEmpty: build => {
    dispatch(toggleEmpty(build));
  },
  updateCurrentOrder: order => {
    dispatch(updateCurrentOrder(order));
  },

});

const TimeLineContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildSingle);

export default TimeLineContainer;

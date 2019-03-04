import { connect } from 'react-redux';
import GameHelper from '../components/GameHelper/GameHelper';
import { fetchAndUpdateUser } from '../actions/user';
import { updateBuildById, fetchBuildById, toggleEmpty } from '../actions/build';


const returnJustOrders = buildList => {
  if (buildList) {
    const newTimeline = [];
    for (let i = 0; i < buildList.length; i++) {
      const { order } = buildList[i];
      if (order.race_unit) {
        newTimeline.push(buildList[i]);
      }
    }
    return newTimeline;
  }
};

const mapStateToProps = state => {
  if (state.currentVisibleBuild.item.build) {
    return {
      currentVisibleBuild: state.currentVisibleBuild,
      userState: state.userState,
      justOrders: returnJustOrders(state.currentVisibleBuild.item.build.build_list),
      totalLength: state.currentVisibleBuild.item.build.build_list ? state.currentVisibleBuild.item.build.build_list.length : null,
    };
  }
  return {
    currentVisibleBuild: state.currentVisibleBuild,
    userState: state.userState,
  };
};
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
  fetchAndUpdateUser: user => {
    dispatch(fetchAndUpdateUser(user));
  },

});

const InGameHelper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameHelper);

export default InGameHelper;

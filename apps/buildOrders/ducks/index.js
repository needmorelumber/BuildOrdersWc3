import app from '../../common/feathers/client';

const builds = app.service('/api/builds');

// Actions
export const SET_BUILD_ORDER = 'build_orders/SET_BUILD_ORDER';

// Action creators
export const setBuildOrder = buildOrder => ({ type: SET_BUILD_ORDER, buildOrder });

// Thunks
export const getBuildOrderCall = id => dispatch => builds('builds')
  .get(id)
  .then(build => dispatch(setBuildOrder(build)));

// Reducer
export default (buildOrder = {}, action) => {
  switch (action.type) {
    case SET_BUILD_ORDER:
      return buildOrder;
    default:
      return buildOrder;
  }
};

import app from '../../common/feathers/client';

const builds = app.service('/api/builds');

// Actions
export const SET_BUILD_ORDERS = 'build_orders/SET_BUILD_ORDERS';

// Action creators
export const setBuildOrders = buildOrders => ({ type: SET_BUILD_ORDERS, buildOrders });

// Thunks
export const getBuildOrdersCall = params => dispatch => builds
  .find(params)
  .then(buildOrders => dispatch(setBuildOrders(buildOrders)));
// Reducer
export default (buildOrders = [], action) => {
  switch (action.type) {
    case SET_BUILD_ORDERS:
      return action.buildOrders;
    default:
      return buildOrders;
  }
};

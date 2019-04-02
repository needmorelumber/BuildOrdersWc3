import app from '../../common/feathers/client';

const builds = app.service('/api/builds');

// Actions
export const SET_BUILD_ORDER = 'build_orders/SET_BUILD_ORDER';

// Action creators
export const setBuildOrder = buildOrder => ({ type: SET_BUILD_ORDER, buildOrder });

// Thunks
export const getBuildOrderCall = id => dispatch => builds
  .get(id)
  .then(build => dispatch(setBuildOrder(build)));

export const createBuild = build => builds.create(build);

export const updateBuild = build => builds.update(build._id, build);

export const createDummyBuild = () => createBuild({
  name: 'foobar',
  race: 'OR',
  opposing_race: 'OR',
  matchup: 'ORvOR',
  description: 'foo',
  patch: '4.20',
  ownerId: 1,
  ownerUsername: 'foo',
  buildSteps: [],
});


// Reducer
export default (buildOrder = {}, action) => {
  switch (action.type) {
    case SET_BUILD_ORDER:
      return action.buildOrder;
    default:
      return buildOrder;
  }
};

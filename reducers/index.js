import { combineReducers } from 'redux';
import { builds, currentVisibleBuild, newBuildForm } from './builds';
import { addOrderForm } from './addOrder';
import { login, register, userState } from './user';
import buildOrder from '../apps/buildOrders/ducks/build';
import buildOrders from '../apps/buildOrders/ducks/builds';


const reducers = combineReducers({
  builds,
  buildOrder,
  buildOrders,
  currentVisibleBuild,
  newBuildForm,
  addOrderForm,
  login,
  register,
  userState,
});

export default reducers;

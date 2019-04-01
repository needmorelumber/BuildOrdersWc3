import { combineReducers } from 'redux';
import { builds, currentVisibleBuild, newBuildForm } from './builds';
import { addOrderForm } from './addOrder';
import { login, register, userState } from './user';
import buildOrders from '../apps/buildOrders/ducks';


const warcraftApp = combineReducers({
  builds,
  buildOrders,
  currentVisibleBuild,
  newBuildForm,
  addOrderForm,
  login,
  register,
  userState,
});

export default warcraftApp;

import { combineReducers } from 'redux';
import { builds, currentVisibleBuild, newBuildForm } from './builds';
import { addOrderForm } from './addOrder';
import { login, register, userState } from './user';
import buildOrder from '../apps/buildOrders/ducks';


const warcraftApp = combineReducers({
  builds,
  buildOrder,
  currentVisibleBuild,
  newBuildForm,
  addOrderForm,
  login,
  register,
  userState,
});

export default warcraftApp;

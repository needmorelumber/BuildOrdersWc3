import { combineReducers } from 'redux'
import {builds, currentVisibleBuild, newBuildForm} from './builds'
import {addOrderForm} from './addOrder'
import {login} from './user';



const warcraftApp = combineReducers({
  builds,
  currentVisibleBuild,
  newBuildForm,
  addOrderForm,
  login

})

export default warcraftApp
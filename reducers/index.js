import { combineReducers } from 'redux'
import {builds, currentVisibleBuild, newBuildForm} from './builds'
import {addOrderForm} from './addOrder'



const warcraftApp = combineReducers({
  builds,
  currentVisibleBuild,
  newBuildForm,
  addOrderForm

})

export default warcraftApp
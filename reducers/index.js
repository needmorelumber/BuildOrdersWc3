import { combineReducers } from 'redux'
import {builds, currentVisibleBuild, newBuildForm} from './builds'
import {addOrderForm} from './timeline'



const warcraftApp = combineReducers({
  builds,
  currentVisibleBuild,
  newBuildForm,
  addOrderForm

})

export default warcraftApp
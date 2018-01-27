import {connect} from 'react-redux'
import * as _ from 'lodash'
import {requestBuilds, fetchBuildById, fetchBuilds, likeBuild} from './../actions/build'
import BuildList from '../components/BuildList/BuildList'

const getPageArray = (builds, page) => {
  
}
const getVisibleBuilds = (builds, filter, page) => {
  var pageArray = getPageArray(builds, page)
  switch (filter) {
    case 'SHOW_ORC':
      return builds.filter(b => {
        if (b.race === 'Orc') {;
          return true
        } else {
          return false
        }
      })
    case 'SHOW_NIGHTELF':
      return builds.filter(b => {
        if (b.race === 'Night Elf') {;
          return true
        } else {
          return false
        }
      })
    case 'SHOW_HUMAN':
      return builds.filter(b => {
        if (b.race === 'Human') {;
          return true
        } else {
          return false
        }
      })
    case 'SHOW_UNDEAD':
      return builds.filter(b => {
        if (b.race === 'Undead') {;
          return true
        } else {
          return false
        }
      })
    case 'SHOW_POPULAR':
     return builds.sort(function (a, b) {
      return a.likes - b.likes;
      });
    case 'SHOW_ALL':
    default:
      return builds
  }
}
const mapStateToProps = (state) => {
  const newBuilds = Object.assign(state.builds, {}, {
    visible_items: getVisibleBuilds(state.builds.items, state.builds.visibilityFilter, state.builds.page),
    page: state.builds.page
  })
  console.log(newBuilds)
  return {
    builds: newBuilds,
    ...state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onBuildClick: id => {
      dispatch(fetchBuildById(id))
    },
    fetchBuilds: (page) => {
      dispatch(fetchBuilds())
    },
    likeBuild: (id, page) => {
      dispatch(likeBuild(id, page));
    }
  }
}

const VisibleBuilds = connect(mapStateToProps, mapDispatchToProps)(BuildList)

export default VisibleBuilds
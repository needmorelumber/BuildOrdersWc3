import {connect} from 'react-redux'
import * as _ from 'lodash'
import {requestBuilds, fetchBuildById, fetchBuilds, likeBuild} from './../actions/build'
import BuildList from '../components/BuildList/BuildList'

const getVisibleBuilds = (builds, filter, query) => {
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
      return b.likes - a.likes;
      })
    case 'SHOW_NEW':
     return builds.sort(function (a, b) {
      return a.created_at - b.created_at;
    });
    case 'SEARCH_BOX':
      return filterItems(builds, query)
    case 'SHOW_ALL':
    default:
      return builds
  }
}
const filterItems = (builds, query) => {
  if(builds==='' || builds===' '|| builds===undefined){return};
    return builds.filter((el) =>
    el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}
const mapStateToProps = (state) => {
  const newBuilds = Object.assign(state.builds, {}, {
    visible_items: getVisibleBuilds(state.builds.items, state.builds.visibilityFilter, state.builds.searchQuery),
    page: state.builds.page
  })
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
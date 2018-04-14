import {connect} from 'react-redux'
import * as _ from 'lodash'
import {requestBuilds, fetchBuildById, fetchBuilds, likeBuild} from './../actions/build'
import BuildList from '../components/BuildList/BuildList';

const getVisibleBuilds = (builds, filter, query, sortType) => {
  switch (filter) {
    case 'SHOW_ORC':
      return applySort(sortType, builds.filter(b => {
        if (b.race === 'Orc') {;
          return true
        } else {
          return false
        }
      }))
    case 'SHOW_NIGHTELF':
      return applySort(sortType, builds.filter(b => {
        if (b.race === 'Night Elf') {;
          return true
        } else {
          return false
        }
      }))
    case 'SHOW_HUMAN':
      return applySort(sortType, builds.filter(b => {
        if (b.race === 'Human') {;
          return true
        } else {
          return false
        }
      }))
    case 'SHOW_UNDEAD':
      return applySort(sortType, builds.filter(b => {
        if (b.race === 'Undead') {;
          return true
        } else {
          return false
        }
      }))
    case 'SEARCH_BOX':
      return filterItems(builds, query)
    case 'SHOW_ALL':
    default:
      return applySort(sortType, builds)
  }
}
const applySort = (sortType, builds) => {
  if(!sortType || sortType === undefined) {
    return builds;
  }
    switch(sortType) {    
      case 'POPULARITY':
        return builds.sort(compareLikes)
      case 'CREATED_ON':
        return builds.sort(compareCreatedDate)
    }
  return builds;
} 
const compareLikes = (a, b) => {
  if(a.likes > b.likes)
    return -1;
  if(a.likes < b.likes)
    return 1;
  return 0
}
const compareCreatedDate = (a, b) => {
  if(a.created_at > b.created_at)
    return -1;
  if(a.created_at < b.created_at)
    return 1;
  return 0  
}
const filterItems = (builds, query) => {
  if(builds==='' || builds===' '|| builds===undefined){return};
    return builds.filter((build) =>
    build.name.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}
const mapStateToProps = (state) => {
  const newBuilds = Object.assign(state.builds, {}, {
    visible_items: getVisibleBuilds(state.builds.items, state.builds.visibilityFilter, state.builds.searchQuery, state.builds.sortType),
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
    likeBuild: (id, page, index) => {
      dispatch(likeBuild(id, page, index));
    }
  }
}

const VisibleBuilds = connect(mapStateToProps, mapDispatchToProps)(BuildList)

export default VisibleBuilds
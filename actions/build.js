import axios from 'axios';

// VISIBILITY FILTERS
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ORC: 'SHOW_ORC',
  SHOW_HUMAN: 'SHOW_HUMAN',
  SHOW_UNDEAD: 'SHOW_UNDEAD',
  SHOW_NIGHTELF: 'SHOW_NIGHTELF',
  SHOW_POPULAR: 'SHOW_POPULAR',
};
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const setVisibilityFilter = filter => ({ type: SET_VISIBILITY_FILTER, payload: filter });

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const setSearchQuery = query => ({ type: SET_SEARCH_QUERY, payload: query });

export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const setSortType = sortType => ({ type: SET_SORT_TYPE, payload: sortType });

export const TOGGLE_EMPTY = 'TOGGLE_EMPTY';
export const toggleEmpty = () => ({
    type: TOGGLE_EMPTY,
    payload: { isToggledOrders: true },
});
export const ADD_MINUTE = 'ADD_MINUTE';
export const addMinute = () => ({ type: ADD_MINUTE });

export const REMOVE_MINUTE = 'REMOVE_MINUTE';
export const removeMinute = () => ({ type: REMOVE_MINUTE });

export const RESTORE_BUILD = 'RESTORE_BUILD';
export const restoreBuild = () => ({
    type: RESTORE_BUILD,
    payload: { isToggledOrders: false },
});

export const CREATE_BUILDS = 'CREATE_BUILDS';
const createBuilds = () => ({ type: CREATE_BUILDS }
)
export const BEGIN_BUILD_UPDATE = 'BEGIN_BUILD_UPDATE';
const beginBuildUpdate => () {
  return {
    type: BEGIN_BUILD_UPDATE,
    payload: {
      isFetching: true,
    },
  };
}
export const RESOLVE_BUILD_UPDATE = 'RESOLVE_BUILD_UPDATE';
const resolveBuildUpdate => (build) {
  return {
    type: RESOLVE_BUILD_UPDATE,
    payload: {
      isFetching: false,
      item: build,
    },
  };
}
export const BEGIN_BUILD_UPLOAD = 'BEGIN_BUILD_UPLOAD';
const beginBuildUpload => (build) {
  return {
    type: BEGIN_BUILD_UPLOAD,
    payload: {
      isFetching: true,
      build,
    },
  };
}
export const RESOLVE_BUILD_UPLOAD = 'RESOLVE_BUILD_UPLOAD';
const resolveBuildUpload => (json) {
  if (json.error) {
    return {
      type: RESOLVE_BUILD_UPLOAD,
      payload: {
        isFetching: false,
      },
      error: json.error,
    };
  }
  return {
    type: RESOLVE_BUILD_UPLOAD,
    payload: {
      isFetching: false,
    },
  };
}
export const REQUEST_BUILDS = 'REQUEST_BUILDS';
const requestBuilds => (page) {
  return {
    type: REQUEST_BUILDS,
    payload: {
      page,
    },
  };
}
export const RECEIVE_BUILDS = 'RECEIVE_BUILDS';
const receiveBuilds => (json) {
  return {
    type: RECEIVE_BUILDS,
    payload: {
      items: json,
      receivedAt: Date.now(),
    },

  };
}
export const REQUEST_BUILD_ID = 'REQUEST_BUILD_ID';
const requestBuildById => (id) {
  return {
    type: REQUEST_BUILD_ID,
    payload: {
      isFetching: true,
    },
  };
}
export const UPDATE_CURRENT_BUILD = 'UPDATE_CURRENT_BUILD';
const updateCurrentBuild => (json) {
  return {
    type: UPDATE_CURRENT_BUILD,
    payload: {
      item: json,
    },
  };
}
export const UPDATE_ONE_BUILD = 'UPDATE_ONE_BUILD';
const updateOneBuild => (json, index) {
  return {
    type: UPDATE_ONE_BUILD,
    payload: {
      index,
      item: json,
    },
  };
}
export const BEGIN_DELETE_BUILD = 'BEGIN_DELETE_BUILD';
const beginDeleteBuild => () {
  return { type: BEGIN_DELETE_BUILD };
}
export const RESOLVE_DELETE_BUILD = 'RESOLVE_DELETE_BUILD';
const resolveDeleteBuild => (json) {
  return { type: RESOLVE_DELETE_BUILD };
}
export const NEXT_PAGE_BUILDS = 'NEXT_PAGE_BUILDS';
const nextPage => (currPage) {
  return {
    type: NEXT_PAGE_BUILDS,
    payload: {
      nextPage: currPage + 1,
    },
  };
}
export const FAILED_LOADING_BUILDS = 'FAILED_LOADING_BUILDS';
const failedLoadingBuilds => () {
  return { type: FAILED_LOADING_BUILDS };
}
export const UPDATE_ADD_ORDER_MESSAGE = 'UPDATE_ADD_ORDER_MESSAGE';
export const updateAddOrderMessage => (message) {
  return {
    type: UPDATE_ADD_ORDER_MESSAGE,
    payload: {
      message,
    },
  };
}
export const UPDATE_CURRENT_ORDER = 'UPDATE_CURRENT_ORDER';
export const updateCurrentOrder => (order) {
  return {
    type: UPDATE_CURRENT_ORDER,
    payload: {
      order,
    },
  };
}
export const TOGGLE_ADDING_ORDER = 'TOGGLE_ADDING_ORDER';
export const toggleAddingOrder => (bool) {
  return { type: TOGGLE_ADDING_ORDER,
    payload: {
      bool,
    } };
}
export const fetchBuilds => (currPage) {
  return function (dispatch) {
    dispatch(requestBuilds());
    return axios
      .get('/api/all_builds')
      .then(res => (res.data))
      .then(json => {
        dispatch(receiveBuilds(json));
      })
      .catch(err => {
        dispatch(failedLoadingBuilds());
      });
  };
}
export const fetchBuildById => (id) {
  return function (dispatch) {
    dispatch(requestBuildById(id));
    return axios
      .post('/api/get_by_id', { id })
      .then(res => (res.data))
      .then(json => {
        dispatch(updateCurrentBuild(json));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export const newBuild => (build) {
  return function (dispatch) {
    dispatch(beginBuildUpload());
    return axios
      .post('/api/new_build', build)
      .then(res => (res.data), err => console.log(err))
      .then(json => {
        // This json should have information about error from the server
        dispatch(resolveBuildUpload(json));
        dispatch((fetchBuilds()));
      });
  };
}
export const updateBuildById => (build, id) {
  return function (dispatch) {
    dispatch(beginBuildUpdate());
    return axios
      .post('/api/update_build', {
        id,
        timeline: build,
      })
      .then(res => (res.data), err => console.log(err))
      .then(json => {
        dispatch(resolveBuildUpdate(json));
      });
  };
}
export const deleteBuild => (id) {
  return function (dispatch) {
    dispatch(beginDeleteBuild());
    return axios
      .post('/api/delete_build', { id })
      .then(res => {
        console.log(res);
        if (res.data.deleted) {
          dispatch(fetchBuilds());
          dispatch(resolveDeleteBuild());
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}
export const updateLoginMessageTimed => (message) {
  return function (dispatch) {
    dispatch(updateAddOrderMessage(message));
    window.setTimeout(() => {
      dispatch(updateAddOrderMessage(''));
    }, 2800);
  };
}
export const addMinuteApi => (build, id) {
  return function (dispatch) {
    dispatch(addMinute());
    return axios
      .post('/api/add_minute', {
        id,
        timeline: build,
      })
      .then(res => (res.data), err => console.log(err))
      .then(json => {
        dispatch(resolveBuildUpdate(json));
      });
  };
}
export const removeMinuteApi => (build, id) {
  return function (dispatch) {
    dispatch(removeMinute());
    return axios
      .post('/api/remove_minute', {
        id,
        timeline: build,
      })
      .then(res => (res.data), err => console.log(err))
      .then(json => {
        dispatch(resolveBuildUpdate(json));
      });
  };
}
export const likeBuild => (id, currPage, index) {
  return function (dispatch) {
    return axios
      .post('/api/like_build', { id, index })
      .then(res => {
        if (res.data !== 'Already Liked') {
          dispatch(fetchBuilds());
          dispatch(updateOneBuild(res.data.build, res.data.index));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

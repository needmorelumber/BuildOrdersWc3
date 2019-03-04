import axios from 'axios';

// VISIBILITY FILTERS
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ORC: 'SHOW_ORC',
  SHOW_HUMAN: 'SHOW_HUMAN',
  SHOW_UNDEAD: 'SHOW_UNDEAD',
  SHOW_NIGHTELF: 'SHOW_NIGHTELF',
  SHOW_POPULAR: 'SHOW_POPULAR',
  SHOW_ALL: 'SHOW_ALL',

};
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, payload: filter };
}
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export function setSearchQuery(query) {
  return { type: SET_SEARCH_QUERY, payload: query };
}
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export function setSortType(sortType) {
  return { type: SET_SORT_TYPE, payload: sortType };
}
export const TOGGLE_EMPTY = 'TOGGLE_EMPTY';
export function toggleEmpty() {
  return {
    type: TOGGLE_EMPTY,
    payload: {
      isToggledOrders: true,
    },
  };
}
export const ADD_MINUTE = 'ADD_MINUTE';
export function addMinute() {
  return { type: ADD_MINUTE };
}
export const REMOVE_MINUTE = 'REMOVE_MINUTE';
export function removeMinute() {
  return { type: REMOVE_MINUTE };
}
export const RESTORE_BUILD = 'RESTORE_BUILD';
export function restoreBuild() {
  return {
    type: RESTORE_BUILD,
    payload: {
      isToggledOrders: false,
    },
  };
}
export const CREATE_BUILDS = 'CREATE_BUILDS';
function createBuilds() {
  return { type: CREATE_BUILDS };
}
export const BEGIN_BUILD_UPDATE = 'BEGIN_BUILD_UPDATE';
function beginBuildUpdate() {
  return {
    type: BEGIN_BUILD_UPDATE,
    payload: {
      isFetching: true,
    },
  };
}
export const RESOLVE_BUILD_UPDATE = 'RESOLVE_BUILD_UPDATE';
function resolveBuildUpdate(build) {
  return {
    type: RESOLVE_BUILD_UPDATE,
    payload: {
      isFetching: false,
      item: build,
    },
  };
}
export const BEGIN_BUILD_UPLOAD = 'BEGIN_BUILD_UPLOAD';
function beginBuildUpload(build) {
  return {
    type: BEGIN_BUILD_UPLOAD,
    payload: {
      isFetching: true,
      build,
    },
  };
}
export const RESOLVE_BUILD_UPLOAD = 'RESOLVE_BUILD_UPLOAD';
function resolveBuildUpload(json) {
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
function requestBuilds(page) {
  return {
    type: REQUEST_BUILDS,
    payload: {
      page,
    },
  };
}
export const RECEIVE_BUILDS = 'RECEIVE_BUILDS';
function receiveBuilds(json) {
  return {
    type: RECEIVE_BUILDS,
    payload: {
      items: json,
      receivedAt: Date.now(),
    },

  };
}
export const REQUEST_BUILD_ID = 'REQUEST_BUILD_ID';
function requestBuildById(id) {
  return {
    type: REQUEST_BUILD_ID,
    payload: {
      isFetching: true,
    },
  };
}
export const UPDATE_CURRENT_BUILD = 'UPDATE_CURRENT_BUILD';
function updateCurrentBuild(json) {
  return {
    type: UPDATE_CURRENT_BUILD,
    payload: {
      item: json,
    },
  };
}
export const UPDATE_ONE_BUILD = 'UPDATE_ONE_BUILD';
function updateOneBuild(json, index) {
  return {
    type: UPDATE_ONE_BUILD,
    payload: {
      index,
      item: json,
    },
  };
}
export const BEGIN_DELETE_BUILD = 'BEGIN_DELETE_BUILD';
function beginDeleteBuild() {
  return { type: BEGIN_DELETE_BUILD };
}
export const RESOLVE_DELETE_BUILD = 'RESOLVE_DELETE_BUILD';
function resolveDeleteBuild(json) {
  return { type: RESOLVE_DELETE_BUILD };
}
export const NEXT_PAGE_BUILDS = 'NEXT_PAGE_BUILDS';
function nextPage(currPage) {
  return {
    type: NEXT_PAGE_BUILDS,
    payload: {
      nextPage: currPage + 1,
    },
  };
}
export const FAILED_LOADING_BUILDS = 'FAILED_LOADING_BUILDS';
function failedLoadingBuilds() {
  return { type: FAILED_LOADING_BUILDS };
}
export const UPDATE_ADD_ORDER_MESSAGE = 'UPDATE_ADD_ORDER_MESSAGE';
export function updateAddOrderMessage(message) {
  return {
    type: UPDATE_ADD_ORDER_MESSAGE,
    payload: {
      message,
    },
  };
}
export const UPDATE_CURRENT_ORDER = 'UPDATE_CURRENT_ORDER';
export function updateCurrentOrder(order) {
  return {
    type: UPDATE_CURRENT_ORDER,
    payload: {
      order,
    },
  };
}
export const TOGGLE_ADDING_ORDER = 'TOGGLE_ADDING_ORDER';
export function toggleAddingOrder(bool) {
  return { type: TOGGLE_ADDING_ORDER,
    payload: {
      bool,
    } };
}
export function fetchBuilds(currPage) {
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
export function fetchBuildById(id) {
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
export function newBuild(build) {
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
export function updateBuildById(build, id) {
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
export function deleteBuild(id) {
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
export function updateLoginMessageTimed(message) {
  return function (dispatch) {
    dispatch(updateAddOrderMessage(message));
    window.setTimeout(() => {
      dispatch(updateAddOrderMessage(''));
    }, 2800);
  };
}
export function addMinuteApi(build, id) {
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
export function removeMinuteApi(build, id) {
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
export function likeBuild(id, currPage, index) {
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

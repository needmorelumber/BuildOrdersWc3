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
export const createBuilds = () => ({ type: CREATE_BUILDS });

export const BEGIN_BUILD_UPDATE = 'BEGIN_BUILD_UPDATE';
const beginBuildUpdate = () => ({
  type: BEGIN_BUILD_UPDATE,
  payload: {
    isFetching: true,
  },
});

export const RESOLVE_BUILD_UPDATE = 'RESOLVE_BUILD_UPDATE';
const resolveBuildUpdate = build => ({
  type: RESOLVE_BUILD_UPDATE,
  payload: {
    isFetching: false,
    item: build,
  },
});

export const BEGIN_BUILD_UPLOAD = 'BEGIN_BUILD_UPLOAD';
const beginBuildUpload = build => ({
  type: BEGIN_BUILD_UPLOAD,
  payload: {
    isFetching: true,
    build,
  },
});

export const RESOLVE_BUILD_UPLOAD = 'RESOLVE_BUILD_UPLOAD';
const resolveBuildUpload = json => (
  json.error
    ? ({
      type: RESOLVE_BUILD_UPLOAD,
      payload: {
        isFetching: false,
      },
      error: json.error,
    })
    : ({
      type: RESOLVE_BUILD_UPLOAD,
      payload: {
        isFetching: false,
      },
    })
);
export const REQUEST_BUILDS = 'REQUEST_BUILDS';
const requestBuilds = page => ({
  type: REQUEST_BUILDS,
  payload: { page },
});

export const RECEIVE_BUILDS = 'RECEIVE_BUILDS';
const receiveBuilds = json => ({
  type: RECEIVE_BUILDS,
  payload: {
    items: json,
    receivedAt: Date.now(),
  },
});

export const REQUEST_BUILD_ID = 'REQUEST_BUILD_ID';
// TODO: figure out what ID is supposed to do here
// eslint-disable-next-line no-unused-vars
const requestBuildById = id => ({
  type: REQUEST_BUILD_ID,
  payload: { isFetching: true },
});

export const UPDATE_CURRENT_BUILD = 'UPDATE_CURRENT_BUILD';
const updateCurrentBuild = json => ({
  type: UPDATE_CURRENT_BUILD,
  payload: { item: json },
});

export const UPDATE_ONE_BUILD = 'UPDATE_ONE_BUILD';
const updateOneBuild = (json, index) => ({
  type: UPDATE_ONE_BUILD,
  payload: {
    index,
    item: json,
  },
});

export const BEGIN_DELETE_BUILD = 'BEGIN_DELETE_BUILD';
const beginDeleteBuild = () => ({ type: BEGIN_DELETE_BUILD });

export const RESOLVE_DELETE_BUILD = 'RESOLVE_DELETE_BUILD';
const resolveDeleteBuild = () => ({ type: RESOLVE_DELETE_BUILD });

export const NEXT_PAGE_BUILDS = 'NEXT_PAGE_BUILDS';
export const nextPage = currPage => ({
  type: NEXT_PAGE_BUILDS,
  payload: { nextPage: currPage + 1 },
});

export const FAILED_LOADING_BUILDS = 'FAILED_LOADING_BUILDS';
const failedLoadingBuilds = () => ({ type: FAILED_LOADING_BUILDS });

export const UPDATE_ADD_ORDER_MESSAGE = 'UPDATE_ADD_ORDER_MESSAGE';
export const updateAddOrderMessage = message => ({
  type: UPDATE_ADD_ORDER_MESSAGE,
  payload: { message },
});

export const UPDATE_CURRENT_ORDER = 'UPDATE_CURRENT_ORDER';
export const updateCurrentOrder = order => ({
  type: UPDATE_CURRENT_ORDER,
  payload: { order },
});

export const TOGGLE_ADDING_ORDER = 'TOGGLE_ADDING_ORDER';
export const toggleAddingOrder = bool => ({
  type: TOGGLE_ADDING_ORDER,
  payload: { bool },
});

export const fetchBuilds = () => (
  dispatch => {
    dispatch(requestBuilds());
    return axios
      .get('/api/all_builds')
      .then(res => (res.data))
      .then(json => {
        dispatch(receiveBuilds(json));
      })
      .catch(() => {
        dispatch(failedLoadingBuilds());
      });
  }
);

export const fetchBuildById = id => (
  dispatch => {
    dispatch(requestBuildById(id));
    return axios
      .post('/api/get_by_id', { id })
      .then(res => (res.data))
      .then(json => {
        dispatch(updateCurrentBuild(json));
      });
  }
);

export const newBuild = build => (
  dispatch => {
    dispatch(beginBuildUpload());
    return axios
      .post('/api/new_build', build)
      .then(res => res.data)
      .then(json => {
        // This json should have information about error from the server
        dispatch(resolveBuildUpload(json));
        dispatch((fetchBuilds()));
      });
  }
);

export const updateBuildById = (build, id) => (
  dispatch => {
    dispatch(beginBuildUpdate());
    return axios
      .post('/api/update_build', {
        id,
        timeline: build,
      })
      .then(res => res.data)
      .then(json => {
        dispatch(resolveBuildUpdate(json));
      });
  }
);

export const deleteBuild = id => (
  dispatch => {
    dispatch(beginDeleteBuild());
    return axios
      .post('/api/delete_build', { id })
      .then(res => {
        if (res.data.deleted) {
          dispatch(fetchBuilds());
          dispatch(resolveDeleteBuild());
        }
      });
  }
);

export const updateLoginMessageTimed = message => (
  dispatch => {
    dispatch(updateAddOrderMessage(message));
    setTimeout(() => {
      dispatch(updateAddOrderMessage(''));
    }, 2800);
  }
);

export const addMinuteApi = (build, id) => (
  dispatch => {
    dispatch(addMinute());
    return axios
      .post('/api/add_minute', {
        id,
        timeline: build,
      })
      .then(res => res.data)
      .then(json => {
        dispatch(resolveBuildUpdate(json));
      });
  }
);

export const removeMinuteApi = (build, id) => (
  dispatch => {
    dispatch(removeMinute());
    return axios
      .post('/api/remove_minute', {
        id,
        timeline: build,
      })
      .then(res => res.data)
      .then(json => {
        dispatch(resolveBuildUpdate(json));
      });
  }
);

export const likeBuild = (id, currPage, index) => (
  dispatch => (
    axios
      .post('/api/like_build', { id, index })
      .then(res => {
        if (res.data !== 'Already Liked') {
          dispatch(fetchBuilds());
          dispatch(updateOneBuild(res.data.build, res.data.index));
        }
      })
  )
);

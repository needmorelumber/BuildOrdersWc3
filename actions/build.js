import axios from 'axios';

//VISIBILITY FILTERS
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ORC: 'SHOW_ORC',
    SHOW_HUMAN: 'SHOW_HUMAN',
    SHOW_UNDEAD: 'SHOW_UNDEAD',
    SHOW_NIGHTELF: 'SHOW_NIGHTELF'

}
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"
export function setVisibilityFilter(filter) {
    return {type: SET_VISIBILITY_FILTER, payload: filter}
}

export const TOGGLE_EMPTY = "TOGGLE_EMPTY";
export function toggleEmpty() {
    return {
        type: TOGGLE_EMPTY,
        payload: {
            isToggledOrders: true
        }
    }
}
export const ADD_MINUTE = "ADD_MINUTE"
export function addMinute() {
    return {type: ADD_MINUTE}
}
export const RESTORE_BUILD = "RESTORE_BUILD";
export function restoreBuild() {
    return {
        type: RESTORE_BUILD,
        payload: {
            isToggledOrders: false
        }
    }
}
export const CREATE_BUILDS = "CREATE_BUILDS";
function createBuilds() {
    return {type: CREATE_BUILDS}
}
export const BEGIN_BUILD_UPDATE = "BEGIN_BUILD_UPDATE";
function beginBuildUpdate() {
    return {
        type: BEGIN_BUILD_UPDATE,
        payload: {
            isFetching: true
        }
    }
}
export const RESOLVE_BUILD_UPDATE = "RESOLVE_BUILD_UPDATE";
function resolveBuildUpdate(build) {
    return {
        type: RESOLVE_BUILD_UPDATE,
        payload: {
            isFetching: false,
            item: build
        }
    }

}
export const BEGIN_BUILD_UPLOAD = "BEGIN_BUILD_UPLOAD"
function beginBuildUpload(build) {
    return {
        type: BEGIN_BUILD_UPLOAD,
        payload: {
            isFetching: true,
            build: build
        }
    }
}
export const RESOLVE_BUILD_UPLOAD = "RESOLVE_BUILD_UPLOAD"
function resolveBuildUpload(json) {
    if (json.error) {
        return {
            type: RESOLVE_BUILD_UPLOAD,
            payload: {
                isFetching: false
            },
            error: json.error
        }
    } else {
        return {
            type: RESOLVE_BUILD_UPLOAD,
            payload: {
                isFetching: false
            }
        }
    }
}
export const REQUEST_BUILDS = 'REQUEST_BUILDS';
function requestBuilds(page) {
    return {
        type: REQUEST_BUILDS,
        payload: {
            page: page
        }
    }
}
export const RECEIVE_BUILDS = 'RECEIVE_BUILDS';
function receiveBuilds(json) {
    return {
        type: RECEIVE_BUILDS,
        payload: {
            items: json,
            receivedAt: Date.now()
        }

    }
}
export const REQUEST_BUILD_ID = 'REQUEST_BUILD_ID';
function requestBuildById(id) {
    return {
        type: REQUEST_BUILD_ID,
        payload: {
            isFetching: true
        }
    }
}
export const UPDATE_CURRENT_BUILD = 'UPDATE_CURRENT_BUILD';
function updateCurrentBuild(json) {
    return {
        type: UPDATE_CURRENT_BUILD,
        payload: {
            item: json
        }
    }
}
export const NEXT_PAGE_BUILDS = "NEXT_PAGE_BUILDS"
function nextPage(currPage) {
    return {
        type: NEXT_PAGE_BUILDS,
        payload: {
            nextPage: currPage + 1
        }
    }
}
export const FAILED_LOADING_BUILDS = 'FAILED_LOADING_BUILDS';
function failedLoadingBuilds() {
    return {type: FAILED_LOADING_BUILDS}
}
export const UPDATE_ADD_ORDER_MESSAGE = "UPDATE_ADD_ORDER_MESSAGE";
export function updateAddOrderMessage(message) {
    return {
        type: UPDATE_ADD_ORDER_MESSAGE,
        payload: {
            message: message
        }
    }
}
export function fetchBuilds(currPage) {
    return function (dispatch) {
        dispatch(requestBuilds(currPage))
        return axios
            .get(`/api/builds_by_page/${currPage}`)
            .then(res => (res.data),)
            .then(json => {
                dispatch(receiveBuilds(json))
            })
            .catch((err) => {
                dispatch(failedLoadingBuilds())
            })
    }
}
export function fetchBuildById(id) {
    return function (dispatch) {
        dispatch(requestBuildById(id))
        return axios
            .post(`/api/get_by_id`, {id})
            .then(res => (res.data),)
            .then(json => {
                dispatch(updateCurrentBuild(json))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export function newBuild(build) {
    return function (dispatch) {
        dispatch(beginBuildUpload())
        return axios
            .post(`/api/new_build`, build)
            .then(res => (res.data), err => console.log(err))
            .then(json => {
                // This json should have information about error from the server
                dispatch(resolveBuildUpload(json))
                dispatch((fetchBuilds()))
            })

    }
}
export function updateBuildById(build, id) {
    return function (dispatch) {
        dispatch(beginBuildUpdate())
        return axios
            .post(`/api/update_build`, {
            id: id,
            timeline: build
        })
            .then(res => (res.data), err => console.log(err))
            .then(json => {
                dispatch(resolveBuildUpdate(json));
            })
    }
}
export function updateLoginMessageTimed(message) {
    return function (dispatch) {
        dispatch(updateAddOrderMessage(message))
        window.setTimeout(() => {
            dispatch(updateAddOrderMessage(""))
        }, 2800)
    }
}
export function addMinuteApi(build, id) {
    return function (dispatch) {
        dispatch(addMinute())
        return axios
            .post(`/api/add_minute`, {
            id: id,
            timeline: build
        })
            .then(res => (res.data), err => console.log(err))
            .then(json => {
                dispatch(resolveBuildUpdate(json));
            })
    }
}
export function likeBuild(id, currPage) {
    return function (dispatch) {
        return axios
            .post(`/api/like_build`, {id: id})
            .then(res => (res.data), err => console.log(err))
            .then(res => {
                console.log(res)
                dispatch(fetchBuilds(currPage))
            })
    }
}
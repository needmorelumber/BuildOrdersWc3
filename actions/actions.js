

// // These are actions that reducers will process
// // The action is the returned object | the function is the 'action creator' 
// // Actions will look like have only these four fields { type, payload, error, meta }.

// //  isFetching  === talking to server
// export const REQUEST_BUILDS = 'REQUEST_BUILDS';
// function requestBuilds() {
//     return {
//         type: REQUEST_BUILDS
//     }
// }
// export const RECEIVE_BUILDS = 'RECEIVE_BUILDS';
// function receiveBuilds(json) {
//     return {
//         type: RECEIVE_BUILDS,
//         payload: {
//             items: json,
//             receivedAt: Date.now()
//         }

//     }
// }
// export const REQUEST_BUILD_ID = 'REQUEST_BUILD_ID';
// function requestBuildById(id) {
//     return {
//         type: REQUEST_BUILD_ID,
//         payload: {
//             isFetching: true
//         }
//     }
// }
// export const UPDATE_CURRENT_BUILD = 'UPDATE_CURRENT_BUILD';
// function updateCurrentBuild(json) {
//     return {
//         type: UPDATE_CURRENT_BUILD,
//         payload: {
//             item: json
//         }
//     }
// }

// export const BEGIN_BUILD_UPLOAD = "ADDING_BUILD"
// function beginBuildUpload(build) {
//     return {
//         type: BEGIN_BUILD_UPLOAD,
//         payload: {
//             isFetching: true,
//             build: build
//         }
//     }
// }
// export const RESOLVE_BUILD_UPLOAD = "RESOLVE_BUILD_UPLOAD"
// function resolveBuildUpload(json) {
//     if(json.error) {
//         return {
//             type: RESOLVE_BUILD_UPLOAD,
//             payload: {
//                 isFetching: false
//             },
//             error: json.error
//         }
//     } else {
//         return {
//             type: RESOLVE_BUILD_UPLOAD,
//             payload: {
//                 isFetching: false
//             }
//         }
//     }
// }
// export const BEGIN_BUILD_UPDATE = "BEGIN_BUILD_UPDATE";
// function beginBuildUpdate() {
//     return { 
//         type: BEGIN_BUILD_UPDATE,
//         payload: {
//             isFetching: true
//         }
//     }
// }
// export const RESOLVE_BUILD_UPDATE = "RESOLVE_BUILD_UPDATE";
// function resolveBuildUpdate() {
//     return{   
//         type: RESOLVE_BUILD_UPDATE,
//         payload: {
//             isFetching: false
//         }
//     }

// }
// export const TOGGLE_EMPTY = "TOGGLE_EMPTY";
// export function toggleEmpty(build) {
//     return{
//         type: TOGGLE_EMPTY,
//         payload: {
//             isEdit: true,
//             item: {
//                 build: build
//             }
//         }
//     }
// }
// export const CREATE_BUILDS = "CREATE_BUILDS";
// function createBuilds() {
//     return{
//         type: CREATE_BUILDS
//     }
// }
// export const TRY_LOGIN = "TRY_LOGIN";
// function tryLogin(credentials) {
//     return{
//         type: TRY_LOGIN,
//         payload: {
//             isFetching: true,
//             payload: {credentials}
//         }
//     }
// }
// export const RESOLVE_LOGIN = "RESOLVE_LOGIN";
// function resolveLogin() {
//     return{
//         type: RESOLVE_LOGIN,
        
//     }
// }
// export const TRY_REGISTER = "TRY_REGISTER";
// function tryRegister(credentials) {
//     return{
//         type: TRY_REGISTER,
//         payload: {credentials}
//     }
// }
// export const RESOLVE_REGISTER = "RESOLVE_REGISTER";
// function resolveRegister(user) {
//     return{
//         type: RESOLVE_REGISTER,
//         payload: {
//             user: {user}
//         }
//     }
// }
// export const UPDATE_USER = "UPDATE_USER";
// function updateUser(user){
//     return{
//         type: UPDATE_USER,
//         payload: {
//             user: user
//         }
//     }
// }
// export const UPDATE_REG_MESSAGE = "UPDATE_REG_MESSAGE";
// export function updateRegMessage(message){
//     return{
//         type: UPDATE_REG_MESSAGE,
//         payload: {
//             message: message
//         }
//     }
// }
// export const UPDATE_LOGIN_MESSAGE = "UPDATE_LOGIN_MESSAGE";
// export function updateLoginMessage(message){
//     return{
//         type: UPDATE_LOGIN_MESSAGE,
//         payload: {
//             message: message
//         }
//     }
// }


// export function updateLoginMessageTimed(message){
//     return function(dispatch) {
//         dispatch(updateLoginMessage(message))
//         window.setTimeout(()=>{
//             dispatch(updateLoginMessage(""))
//         }, 2800)
//     }
// }
// export function updateRegMessageTimed(message){
//     return function(dispatch) {
//         dispatch(updateRegMessage(message))
//         window.setTimeout(()=>{
//             dispatch(updateRegMessage(""))
//         }, 2800)
//     }
// }
// //Thunk action creators... returns a function
// export function fetchBuilds() {
//     return function(dispatch) {
//        dispatch(requestBuilds()) 
//        return axios.get(`/api/all_builds`)
//         .then(
//             res => ( res.data ),
//             err => console.log(err)
//         )
//         .then(json =>{
//             dispatch(receiveBuilds(json))
//         })
//     }
// }
// export function fetchBuildById(id) {
//     return function(dispatch) {
//         dispatch(requestBuildById(id))
//         return axios.post(`/api/get_by_id`, {id})
//         .then(
//             res => (res.data),
//             err => console.log(err)
//         )
//         .then(json => {
//             dispatch(updateCurrentBuild(json))
//         })
//     }
// }
// export function newBuild(build) {
//     return function(dispatch) {
//         dispatch(beginBuildUpload())
//         return axios.post(`/api/new_build`, build)
//         .then(
//             res => (res.data),
//             err => console.log(err)
//         )
//         .then( json => {
//             // This json should have information about error from the server
//            dispatch(resolveBuildUpload(json))
//            dispatch((fetchBuilds()))
//         })

//     }
// }
// export function updateBuildById(build, id) {
//     return function(dispatch) {
//         dispatch(beginBuildUpdate())
//         return axios.post(`/api/update_build`,{id: id, timeline: build})
//         .then(
//          res => (res.data),
//          err => console.log(err)
//         )
//         .then( json => {
//             dispatch(resolveBuildUpdate(json));
//         })
//     }
// }
// export function loginToServer(credentials) {
//     return function(dispatch) {
//         dispatch(tryLogin())
//         return axios.post('/api/login',{credentials})
//         .then(
//             res => (res.data),
//             err => dispatch(resolveLogin(err))
//         )
//         .then(user => {  
//             if(user.Message){
//                 dispatch(updateLoginMessageTimed(user.Message))
//                 dispatch(resolveLogin(user))
//             } else{
//                 dispatch(updateLoginMessageTimed("Success"))
//                 dispatch(updateUser(user))
//                 dispatch(resolveLogin(user))
//             }

            
//         })
//     }
// }
// export function registerNewUser(credentials) {
//     return function(dispatch) {
//         dispatch(tryRegister())
//         return axios.post('/api/new_user', {credentials})
//         .then(
//             res => (res.data),
//             err => console.log(err)
//         )
//         .then( user => {
//             if(user.Message){
//                 dispatch(updateRegMessageTimed(user.Message))
//                 dispatch(resolveRegister(user))
//             } else {
//                 dispatch(updateRegMessageTimed("Success"))
//                 dispatch(resolveRegister(user))
//                 dispatch(updateUser(user))
//             }
//         })
//     }
// }
// export function fetchAndUpdateUser() {
//     return (dispatch) => {
//         return axios.get('/api/get_user')
//         .then(
//             res=>(res.data),
//             err=>console.log(err)
//         )
//         .then(user=>{
//             if(user){
//                 dispatch(updateUser(user))
//             }
//         })
//     }
// }
// export function logOut() {
//     return(dispatch) => {
//         return axios.get('/api/logout')
//         .then(
//             res=>(res.data),
//             err=>console.log(err)
//         )
//         .then(res => {
//             dispatch(updateUser(false))
//         })
//     }
// }
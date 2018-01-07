import axios from 'axios';

export const TRY_LOGIN = "TRY_LOGIN";
function tryLogin(credentials) {
    return{
        type: TRY_LOGIN,
        payload: {
            isFetching: true,
            payload: {credentials}
        }
    }
}
export const RESOLVE_LOGIN = "RESOLVE_LOGIN";
function resolveLogin() {
    return{
        type: RESOLVE_LOGIN,
        
    }
}
export const TRY_REGISTER = "TRY_REGISTER";
function tryRegister(credentials) {
    return{
        type: TRY_REGISTER,
        payload: {credentials}
    }
}
export const RESOLVE_REGISTER = "RESOLVE_REGISTER";
function resolveRegister(user) {
    return{
        type: RESOLVE_REGISTER,
        payload: {
            user: {user}
        }
    }
}
export const UPDATE_USER = "UPDATE_USER";
function updateUser(user){
    return{
        type: UPDATE_USER,
        payload: {
            user: user
        }
    }
}
export const UPDATE_REG_MESSAGE = "UPDATE_REG_MESSAGE";
export function updateRegMessage(message){
    return{
        type: UPDATE_REG_MESSAGE,
        payload: {
            message: message
        }
    }
}
export const UPDATE_LOGIN_MESSAGE = "UPDATE_LOGIN_MESSAGE";
export function updateLoginMessage(message){
    return{
        type: UPDATE_LOGIN_MESSAGE,
        payload: {
            message: message
        }
    }
}
export function updateLoginMessageTimed(message){
    return function(dispatch) {
        dispatch(updateLoginMessage(message))
        window.setTimeout(()=>{
            dispatch(updateLoginMessage(""))
        }, 2800)
    }
}
export function updateRegMessageTimed(message){
    return function(dispatch) {
        dispatch(updateRegMessage(message))
        window.setTimeout(()=>{
            dispatch(updateRegMessage(""))
        }, 2800)
    }
}
export function loginToServer(credentials) {
    return function(dispatch) {
        dispatch(tryLogin())
        return axios.post('/api/login',{credentials})
        .then(
            res => (res.data),
            err => dispatch(resolveLogin(err))
        )
        .then(user => {  
            if(user.Message){
                dispatch(updateLoginMessageTimed(user.Message))
                dispatch(resolveLogin(user))
            } else{
                dispatch(updateLoginMessageTimed("Success"))
                dispatch(updateUser(user))
                dispatch(resolveLogin(user))
            }

            
        })
    }
}
export function registerNewUser(credentials) {
    return function(dispatch) {
        dispatch(tryRegister())
        return axios.post('/api/new_user', {credentials})
        .then(
            res => (res.data),
            err => console.log(err)
        )
        .then( user => {
            if(user.Message){
                dispatch(updateRegMessageTimed(user.Message))
                dispatch(resolveRegister(user))
            } else {
                dispatch(updateRegMessageTimed("Success"))
                dispatch(resolveRegister(user))
                dispatch(updateUser(user))
            }
        })
    }
}
export function fetchAndUpdateUser() {
    return (dispatch) => {
        return axios.get('/api/get_user')
        .then(
            res=>(res.data),
            err=>console.log(err)
        )
        .then(user=>{
            if(user){
                dispatch(updateUser(user))
            }
        })
    }
}
export function logOut() {
    return(dispatch) => {
        return axios.get('/api/logout')
        .then(
            res=>(res.data),
            err=>console.log(err)
        )
        .then(res => {
            dispatch(updateUser(false))
        })
    }
}
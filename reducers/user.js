import {TRY_LOGIN,
        TRY_REGISTER,
        RESOLVE_LOGIN,
        RESOLVE_REGISTER
} from './../actions/actions.js'

const loginFormStateReference = {
  user: null,
  isFetching: false,
  inputs:
   {
     "eMail": {
       name: "eMail",
       label: "E-Mail",
       type: "email",
       class: "input",
       userType: "email"
     },
     "password": {
       name: "password",
       label: "Password",
       type: "password",
       class: "input",
       userType: "password"
     },
   }
}
const registerFormStateReference = {
  user: null,
  isFetching: false,
  inputs:
   {
     "username": {
       name: "username",
       label: "Username",
       type: "text",
       class: "input",
       userType: "text"
     },
     "eMail": {
       name: "eMail",
       label: "E-Mail",
       type: "email",
       class: "input",
       userType: "email"
     },
     "password": {
       name: "password",
       label: "Password",
       type: "password",
       class: "input",
       userType: "password"
     },
      "confirmPassword": {
       name: "confirmPassword",
       label: "Confirm Password",
       type: "password",
       class: "input",
       userType: "password"
     }
   }
}
export function login(state=loginFormStateReference, action) {
  switch(action.type) {
    case TRY_LOGIN:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RESOLVE_LOGIN:
      return Object.assign({}, state, {
       isFetching: false,
       user: action.payload.user
      })
      default: return state
  }
}
export function register(state=registerFormStateReference, action) {
  switch(action.type) {
    case TRY_REGISTER:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RESOLVE_REGISTER:
      return Object.assign({}, state, {
       isFetching: false,
       user: action.payload.user
      })
    default:
      return state
  }
}
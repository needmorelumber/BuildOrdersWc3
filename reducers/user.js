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
export function login(state=loginFormStateReference, action) {
  switch(action.type) {
    case TRY_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        currentUser: action.payload.user
      })
    case RESOLVE_LOGIN:
      return Object.assign({}, state, {
       isFetching: false,
       user: action.payload.user
      })
      default: return state
  }
}
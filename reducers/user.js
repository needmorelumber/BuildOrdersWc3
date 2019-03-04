import { TRY_LOGIN,
  TRY_REGISTER,
  RESOLVE_LOGIN,
  RESOLVE_REGISTER,
  UPDATE_USER,
  UPDATE_REG_MESSAGE,
  UPDATE_LOGIN_MESSAGE } from '../actions/user';

const loginFormStateReference = {
  isFetching: false,
  message: '',
  inputs:
   {
     eMail: {
       name: 'eMail',
       label: 'E-Mail',
       type: 'email',
       class: 'input is-large',
       userType: 'email',
     },
     password: {
       name: 'password',
       label: 'Password',
       type: 'password',
       class: 'input is-large',
       userType: 'password',
     },
   },
};
const registerFormStateReference = {
  isFetching: false,
  message: '',
  inputs:
   {
     username: {
       name: 'username',
       label: 'Username',
       type: 'text',
       class: 'input is-large',
       userType: 'text',
     },
     eMail: {
       name: 'eMail',
       label: 'E-Mail',
       type: 'email',
       class: 'input is-large',
       userType: 'email',
     },
     password: {
       name: 'password',
       label: 'Password',
       type: 'password',
       class: 'input is-large',
       userType: 'password',
     },
     confirmPassword: {
       name: 'confirmPassword',
       label: 'Confirm Password',
       type: 'password',
       class: 'input is-large',
       userType: 'password',
     },
   },
};
export function login(state = loginFormStateReference, action) {
  switch (action.type) {
    case TRY_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RESOLVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case UPDATE_LOGIN_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload.message,
      });
    default: return state;
  }
}
export function register(state = registerFormStateReference, action) {
  switch (action.type) {
    case TRY_REGISTER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RESOLVE_REGISTER:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case UPDATE_REG_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload.message,
      });
    default:
      return state;
  }
}
const defaultUserState = {
  user: false,
};
export function userState(state = defaultUserState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    default:
      return state;
  }
}

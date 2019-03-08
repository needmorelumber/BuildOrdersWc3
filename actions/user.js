import axios from 'axios';

export const TRY_LOGIN = 'TRY_LOGIN';
const tryLogin = credentials => ({
    type: TRY_LOGIN,
    payload: {
        isFetching: true,
        payload: { credentials },
    },
});

export const RESOLVE_LOGIN = 'RESOLVE_LOGIN';
const resolveLogin = () => ({ type: RESOLVE_LOGIN });

export const TRY_REGISTER = 'TRY_REGISTER';
const tryRegister = credentials => ({
    type: TRY_REGISTER,
    payload: { credentials },
});

export const RESOLVE_REGISTER = 'RESOLVE_REGISTER';
const resolveRegister = user => ({
    type: RESOLVE_REGISTER,
    payload: {
        user: { user },
    },
});

export const UPDATE_USER = 'UPDATE_USER';
const updateUser = user => ({
    type: UPDATE_USER,
    payload: {
        user,
    },
});

export const UPDATE_REG_MESSAGE = 'UPDATE_REG_MESSAGE';
export const updateRegMessage => message => ({
    type: UPDATE_REG_MESSAGE,
    payload: {
        message,
    },
});

export const UPDATE_LOGIN_MESSAGE = 'UPDATE_LOGIN_MESSAGE';
export const updateLoginMessage = message => ({
    type: UPDATE_LOGIN_MESSAGE,
    payload: {
        message,
    },
});

export const updateLoginMessageTimed = message => (
    dispatch => {
        dispatch(updateLoginMessage(message));
        setTimeout(() => {
            dispatch(updateLoginMessage(''));
        }, 4000);
    }
);

export const updateRegMessageTimed = message => (
    dispatch => {
        dispatch(updateRegMessage(message));
        setTimeout(() => {
            dispatch(updateRegMessage(''));
        }, 4000);
    }
);

export const loginToServer = credentials => (
    dispatch => {
    dispatch(tryLogin());
    return axios.post('/api/login', { credentials })
        .then(
            res => (res.data),
            err => dispatch(resolveLogin(err)),
        )
        .then(user => {
            if (user.Message) {
                dispatch(updateLoginMessageTimed(user.Message));
                dispatch(resolveLogin(user));
            } else {
                dispatch(updateLoginMessageTimed('Success'));
                dispatch(updateUser(user));
                dispatch(resolveLogin(user));
            }
        });
    }
);

export const registerNewUser = credentials => (
    dispatch => {
        dispatch(tryRegister());
        return axios.post('/api/new_user', { credentials })
            .then(
                res => (res.data),
                err => console.log(err),
            )
            .then(user => {
                if (user.Message) {
                    dispatch(updateRegMessageTimed(user.Message));
                    dispatch(resolveRegister(user));
                } else {
                    dispatch(updateRegMessageTimed('Success'));
                    dispatch(resolveRegister(user));
                    dispatch(updateUser(user));
                }
            });
    }
);

export const fetchAndUpdateUser = () => (
    dispatch => axios.get('/api/get_user')
        .then(
            res => (res.data),
            err => console.log(err),
        )
        .then(user => {
            if (user) {
                dispatch(updateUser(user));
            }
        })
);

export const logOut = () => (
    dispatch => axios.get('/api/logout')
        .then(
            res => (res.data),
            err => console.log(err),
        )
        .then(res => {
            dispatch(updateUser(false));
        })
);

export const deleteUser = (password, id) => (
    dispatch => axios.post('/api/delete_user', { id, password })
        .then(res => {
            if (!res.data.Message) {
                dispatch(updateUser(false));
            } else {
                dispatch(updateRegMessageTimed(res.data.Message));
            }
        })
        .catch(err => {
            dispatch(updateRegMessageTimed('Sorry we had an error, please try again'));
        })
);
export const changeUsername (id, username) => (
    dispatch => axios.post('/api/change_username', { id, username })
        .then(res => {
            if (!res.data.Message) {
                console.log(res.data.user);
                dispatch(updateUser(res.data.user));
            } else {
                dispatch(updateRegMessageTimed(res.data.Message));
            }
        })
        .catch(err => {
            dispatch(updateRegMessageTimed('Sorry we had an error, please try again'));
        })
);

export const callLambda = () => (
    // TODO: Figure out what this does, given that it just console.logs
    dispatch => axios.get('api/lambda')
        .then(res => {
            if (res) {
                console.log('got res');
            } else {
                console.log('no res');
            }
            console.log(res);
        }).catch(err => console.log(err));
);

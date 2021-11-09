// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
} from './constants';

export const loginUser = (username, password) => ({
    type: LOGIN_USER,
    payload: { username, password },
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history },
});

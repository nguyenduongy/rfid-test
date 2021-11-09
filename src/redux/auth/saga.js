// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { requestApi } from 'helpers/api';

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, FORGET_PASSWORD ,LOGIN_USER_SUCCESS} from './constants';
//import { BASE_URL} from 'constants/apiConfig.js';

import {
    loginUserSuccess,
    loginUserFailed,
   d,
} from './actions';

/**
 * Sets the session
 * @param {*} user
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user) {
        cookies.set('user', JSON.stringify(user), { path: '/' });
    } else {
        cookies.remove('user', { path: '/' });
    }
};
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:'admin',password:'admin'}),
//        url : 'api/auth/signin'
    };
    try {
        const response = yield (requestApi, options);
        if (response.status==='success') {

            setSession(response.result);
            yield put(loginUserSuccess(response.result));
        } else {
            setSession(null);
            yield put(loginUserFailed(response.result)); //message
        }
    } catch (error) {
        setSession(null);
        yield put(loginUserFailed(error)); //message
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}



export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}

export default authSaga;

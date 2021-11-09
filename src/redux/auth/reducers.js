// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};


const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, errorLogin: null };
        case LOGIN_USER_FAILED:
            return { ...state, errorLogin: action.payload, loading: false };
        case LOGOUT_USER:
            return { ...state, user: null };
            // return { ...state, errorFogot: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Auth;

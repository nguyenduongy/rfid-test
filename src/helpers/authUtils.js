// @flow
import { Cookies } from 'react-cookie';
import {requestApi} from './api';
/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    
    } else {
        return true;
    }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    let newUser= user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
    return newUser;
};

export { isUserAuthenticated, getLoggedInUser };

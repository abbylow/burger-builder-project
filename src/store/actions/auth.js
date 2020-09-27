import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (authData) => {
    console.log(authData)
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        token: authData.idToken
    };
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    };
};

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1gcgV-01-BrF5UYQuPHqy6JMuTE7UM-s';
        if (!isSignedUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1gcgV-01-BrF5UYQuPHqy6JMuTE7UM-s';
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFailed(err.response.data.error));
            })
    };
};
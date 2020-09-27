import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    console.log(authData)
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        token: authData.idToken
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
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
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFailed(err.response.data.error));
            })
    };
};
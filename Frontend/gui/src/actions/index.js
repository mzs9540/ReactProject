import * as actionsTypes from './types';

// Action Creator
import * as axios from "axios";
import {emptyCart, getCart} from "./eCommerceActions";



export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
};

export const authSuccess = (token, username) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
};

export const authFail = error => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
};

export const authLogout = () => {
    return dispatch => {
        axios.post('http://127.0.0.1:8000/rest-auth/logout/',{
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            dispatch(emptyCart());
            dispatch(logout());
        })
    }
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        }).then(res => {
            const token = res.data.key;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            dispatch(authSuccess(token, username));
            dispatch(getCart());
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
};

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key;
            localStorage.setItem('token', token);
            dispatch(authSuccess(token));
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
};

export const authCheckLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('username');
        if (token === undefined) {
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(token, name));
        }
    }
};


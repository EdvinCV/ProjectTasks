import React, { useReducer } from 'react';
// AuthReducer y AuthContext
import authContext from '../Authentication/authContext';
import authReducer from '../Authentication/authReducer';
// Axios
import client from '../../config/axios';
import authToken from '../../config/setToken';
// Actions
import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_ERROR,
    LOGIN_SUCCESSFUL,
    LOGOUT
} from '../../types';

const AuthState = (props) => {
    // Reducer
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Create user
    const createUserFn = async (user) => {
        try {
            const resp = await client.post('/api/users', user);
            dispatch({
                type: REGISTER_SUCCESSFUL,
                payload: resp.data
            });
            userAuthenticated();
        } catch (error) {
            const alert = {
                message: error.response.data.message,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            });
        }
    }

    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token){
            authToken(token);
        }

        try {
            const resp = await client.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: resp.data.user
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    const loginUserFn = async user => {
        try {
            const resp = await client.post('/api/auth', user);
            // If the login is successful
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: resp.data
            });
            userAuthenticated();
        } catch (error) {
            console.log("E", error.response);
            const alert = {
                message: error.response.data.message,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const logoutFn = () => {
        dispatch({
            type: LOGOUT
        });
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                loading: state.loading,
                message: state.message,
                createUserFn,
                loginUserFn,
                userAuthenticated,
                logoutFn
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}
 
export default AuthState;
// Actions
import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_ERROR,
    LOGIN_SUCCESSFUL,
    LOGOUT
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case GET_USER: 
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
        case REGISTER_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null
            }
        case REGISTER_ERROR:
            return {
                ...state,
                token: null,
                message: action.payload,
                loading: false
            }
        case LOGIN_SUCCESSFUL:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            authenticated: true,
            message: null,
            loading: false
        }
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
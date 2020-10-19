// Actions types constants
import {PROJECT_FORM, GET_PROJECTS, POST_PROJECT, SELECTED_PROJECT, DELETE_PROJECT, PROJECT_ERROR} from '../../types';

export default (state, action) => {
    switch(action.type){
        case PROJECT_FORM : {
            return {
                ...state,
                newProject: action.payload
            };
        }
        case SELECTED_PROJECT : {
            return {
                ...state,
                selectedProject: action.payload
            }
        }
        case GET_PROJECTS: {
            return {
                ...state,
                projects: action.payload
            }
        }
        case POST_PROJECT: {
            return {
                ...state,
                project: action.payload
            }
        }
        case DELETE_PROJECT : {
            return {
                ...state,
                selectedProject: null
            }
        }
        case PROJECT_ERROR: {
            return {
                ...state,
                message: action.payload
            }
        }
        default: 
            return state;
    }
}
// Actions types constants
import {PROJECT_FORM, SELECTED_PROJECT, DELETE_PROJECT} from '../../types';

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
        case DELETE_PROJECT : {
            return {
                ...state,
                selectedProject: null
            }
        }
        default: 
            return state;
    }
}
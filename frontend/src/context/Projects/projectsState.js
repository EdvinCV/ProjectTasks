import React, { useReducer, useEffect } from 'react';
// Context
import projectContext from './projectsContext';
// Reducer
import projectReducer from './projectsReducer';
// Action types
import { PROJECT_FORM, GET_PROJECTS, SELECTED_PROJECT, DELETE_PROJECT } from '../../types';

const ProjectState = (props) => {
    // Initial state of reducer
    const initialState = {
        projects: [
            {id: 1, name: 'Node Project'},
            {id: 2, name: 'Java Project'},
            {id: 3, name: 'Mobile Application Project'}
        ],
        newProject: false,
        selectedProject: null
    }
    // Reducer dispatch
    const [state, dispatch] = useReducer(projectReducer, initialState);
    // CRUD operations
    const showProjectFormFn = (value) => {
        dispatch({
            type: PROJECT_FORM,
            payload: value
        });
    }
    // GET - Projects
    // POST - Projects
    const postProjectFn = (name) => {
        // ACTION
        // FETCH
        console.log("Project added")
        showProjectFormFn(false);
    }
    // DELETE PROJECT
    const deleteProjectFn = (projectId) => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        });
    }
    // SELECTED PROJECT
    const selectedProjectFn = (project) => {
        dispatch({
            type: SELECTED_PROJECT,
            payload: project
        });
    }

    
    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                newProject: state.newProject,
                selectedProject: state.selectedProject,
                showProjectFormFn,
                postProjectFn,
                deleteProjectFn,
                selectedProjectFn
            }}
        >
            {props.children}
        </projectContext.Provider>
    );
}
 
export default ProjectState;
import React, { useReducer, useEffect } from 'react';
// Context
import projectContext from './projectsContext';
// Reducer
import projectReducer from './projectsReducer';
// Action types
import { PROJECT_FORM, PROJECT_ERROR, POST_PROJECT, GET_PROJECTS, SELECTED_PROJECT, DELETE_PROJECT } from '../../types';
// Axios client
import client from '../../config/axios';

const ProjectState = (props) => {
    // Initial state of reducer
    const initialState = {
        projects: [],
        newProject: false,
        selectedProject: null,
        project: null,
        message: null
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
    const getProjectsFn = async () => {
        try {
            const resp = await client.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: resp.data.data
            });
        } catch (error) {
            const alert = {
                msg: "There was an error",
                category: "alerta-error"
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    }
    // POST - Projects
    const postProjectFn = async (project) => {
        try {
            const resp = await client.post('/api/projects', project);
            console.log(resp);
            dispatch({
                type: POST_PROJECT,
                payload: project
            });
        } catch (error) {
            const alert = {
                msg: "There was an error",
                category: "alerta-error"
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
        showProjectFormFn(false);
        getProjectsFn();
    }
    // DELETE PROJECT
    const deleteProjectFn = async (projectId) => {
        try {
            const resp = await client.delete(`/api/projects/${projectId}`);
            console.log(resp);
            dispatch({
                type: DELETE_PROJECT
            });
        } catch (error) {
            const alert = {
                msg: "There was an error",
                category: "alerta-error"
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
        getProjectsFn();
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
                message: state.message,
                showProjectFormFn,
                getProjectsFn,
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
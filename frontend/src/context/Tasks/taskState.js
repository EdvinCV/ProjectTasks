import React, { useReducer } from 'react';
// Context y reducer
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
// Actions
import {PROJECT_TASKS, ADD_TASK} from '../../types';

const TaskState = (props) => {
    // Initial State
    const initialState = {
        tasks: [
            {"name": "A", projectId: 1, status: true},
            {"name": "AA", projectId: 1, status: true},
            {"name": "AAA", projectId: 1, status: true},
            {"name": "B", projectId: 2, status: false},
            {"name": "BBB", projectId: 2, status: false},
            {"name": "C", projectId: 3, status: true}
        ],
        tasksProject: [

        ]
    }
    // Reducer
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Tasks operations
    const getTasksFn = (id) => {
        dispatch({
            type: PROJECT_TASKS,
            payload: id
        });
    }
    const addTaskFn = task => {
        console.log(task);
        dispatch({
            type: ADD_TASK
        });
    }

    return (
        <TaskContext.Provider 
            value={{
                tasks: state.tasksProject,
                getTasksFn,
                addTaskFn
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}
 
export default TaskState;

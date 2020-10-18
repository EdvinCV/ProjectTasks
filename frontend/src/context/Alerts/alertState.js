import React,{useState, useReducer} from 'react';
// ACTIONS

// REDUCER
import alertReducer from './alertReducer';
// CONTEXT
import alertContext from './alertContext';
import { SHOW_ALERT, HIDE_ALERT } from '../../types';


const AlertState = (props) => {
    const initialState = {
        alert: null
    };
    // state
    // reducer
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Show alert
    const showAlertFn = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 5000)
    }

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlertFn
            }}
        >
            {props.children}
        </alertContext.Provider>
    );
}
 
export default AlertState;
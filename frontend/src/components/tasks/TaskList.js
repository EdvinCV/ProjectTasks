import React, {Fragment, useContext, useEffect} from 'react';
// Components
import Task from './Task';
// Context
import projectContext from '../../context/Projects/projectsContext';
import taskContext from '../../context/Tasks/taskContext';
// CSS Transitions
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = () => {

    const { selectedProject, deleteProjectFn } = useContext(projectContext);

    const {tasks} = useContext(taskContext);

    return (
        <Fragment>
            {
                selectedProject ? (
                    <>
                    <h2>Project: {selectedProject.name}</h2>
                    <ul className="listado-tareas">
                        {tasks.length === 0 ? 
                            <li>There is nos tasks in this project</li>
                            : <TransitionGroup>
                                {tasks.map((task, index) => (
                                    <CSSTransition
                                        key={task.id}
                                        timeout={200}
                                        classNames="tarea"
                                    >
                                        <Task
                                            key={index}
                                            task={task}
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                            
                        }
                    </ul>
                    <button onClick={() => (deleteProjectFn(selectedProject.id))} type="button" className="btn btn-eliminar">
                        Delete project &times;
                    </button>
                    </>
                ) : (
                    <h2>Select a project...</h2>
                )
            }
        </Fragment>
    );
}
 
export default TaskList;
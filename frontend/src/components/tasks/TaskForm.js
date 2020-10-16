import React, { useContext, useState } from 'react';
import projectContext from '../../context/Projects/projectsContext';
import taskContext from '../../context/Tasks/taskContext';

const TaskForm = () => {
    // State
    const [task, setTask] = useState({
        name: ''
    });
    const {name} = task;
    const [error, setError] = useState(false);
    // Selected project
    const {selectedProject} = useContext(projectContext);
    const {addTaskFn} = useContext(taskContext);

    const handleChange = e => {
        setTask({
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log("Add task")
        // Validate
        if(name.trim() === ''){
            setError(true);
            return;
        }
        setError(false);
        // Dispatch
        task.projectId = selectedProject.id;
        task.status = true;
        addTaskFn(task);
        setTask({
            name: ''
        });
    }
    
    if(!selectedProject){
        return null;
    }
    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        className="input-text" 
                        type="text"
                        placeholder="Name of task"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Add task"
                    />
                </div>
            </form>
            {
                error === true ? (
                    <p className="mensaje error">The name field is obligatory</p>
                ) : (
                    null
                )
            }
        </div>
    );
}
 
export default TaskForm;
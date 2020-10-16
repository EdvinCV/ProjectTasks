import React from 'react'

const Task = ({task}) => {
    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {
                    task.status ? (
                        <button type="submit" className="completo">
                            Completed
                        </button>
                    ) : (
                        <button type="submit" className="incompleto">
                            Incompleted
                        </button>
                    )
                }
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primario">
                    Edit
                </button>
                <button type="button" className="btn btn-primario">
                    Delete
                </button>
            </div>
        </li>
    );
}
 
export default Task;
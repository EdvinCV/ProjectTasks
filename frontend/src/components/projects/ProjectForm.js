import React, {Fragment, useState, useContext} from 'react'
// Context
import projectContext from '../../context/Projects/projectsContext'; 

const ProjectForm = () => {
    //
    const {newProject, showProjectFormFn, postProjectFn } = useContext(projectContext);
    // State
    const [project, setProject] = useState({
        id: '',
        name: ''
    });
    const [error, setError] = useState(false);
    const {name} = project;
    // Handle input changes
    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }
    // Handle submit
    const handleSubmit = e => {
        e.preventDefault();
        // Validate inputs
        if(name === ''){
            setError(true);
            return;
        }
        setError(false);
        // Dispatch project
        postProjectFn(name);
        // Clear form
        setProject({
            name: ''
        });
    }
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => {showProjectFormFn(true)}}
            >
                Create project
            </button>
            {
                newProject ? (
                    <form
                        className="formulario-nuevo-proyecto"
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Project name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-primario btn-block" 
                            value="Add Project"
                        />
                        <br/>
                        <button type="button" onClick={() => { showProjectFormFn(false); setError(false) }}>Cancel &times;</button>
                    </form>
                ) : (
                    null
                )
            }
            {
                error ? (
                    <p className="mensaje error">The name field is obligatory</p>
                ) : null
            }
        </Fragment>
    );
}
 
export default ProjectForm;
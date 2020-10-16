import React, { useContext } from 'react'
import projectContext from '../../context/Projects/projectsContext';
import taskContext from '../../context/Tasks/taskContext';
// Context

const ProjectItem = ({project}) => {
    // Get context functions
    const {selectedProjectFn} = useContext(projectContext);

    const {getTasksFn} = useContext(taskContext);

    //
    const selectProject = project => {
        selectedProjectFn(project);
        getTasksFn(project.id);
    }
    

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => {selectProject(project)}} 
            >
                {project.name}
            </button>
        </li>
    );
}
 
export default ProjectItem;
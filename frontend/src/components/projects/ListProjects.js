import React, {useContext} from 'react'
// Components
import ProjectItem from './ProjectItem';
// Context
import projectContext from '../../context/Projects/projectsContext';

const ListProjects = () => {
    // Projects Context
    const {projects} = useContext(projectContext);

    // If there is no projects
    if (projects.length === 0){
        return (
            <h3>You don't have projects yet... :(</h3>
        )
    }
    return (
        <ul className="listado-proyectos">
            {projects.map((project, index) => {
                return <ProjectItem key={index} project={project} />
            })}
        </ul>
    );
}
 
export default ListProjects;
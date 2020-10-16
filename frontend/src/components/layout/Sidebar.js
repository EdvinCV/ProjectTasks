import React from 'react'
// Components
import ProjectForm from '../projects/ProjectForm';
import ListProjects from '../projects/ListProjects';

const Sidebar = () => {
    return (
        <aside>
            <h1>Project<span>Tasks</span></h1>
            
            <ProjectForm />

            <div className="proyectos">
                <h2>Your projects</h2>
                <ListProjects />
            </div>
        </aside>
    );
}
 
export default Sidebar;
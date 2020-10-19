import React, {useContext, useEffect} from 'react'
// Components
import ProjectItem from './ProjectItem';
// Context
import projectContext from '../../context/Projects/projectsContext';
import alertContext from '../../context/Alerts/alertContext';

const ListProjects = () => {
    
    // Projects Context
    const {message, getProjectsFn, projects} = useContext(projectContext);
    const {alert, showAlertFn} = useContext(alertContext);

    useEffect(() => {
        if(message){
            showAlertFn(message.msg, message.category);
        }
        getProjectsFn();
    }, [message]);
    // If there is no projects
    if (projects.length === 0){
        return (
            <h3>You don't have projects yet... :(</h3>
        )
    }
    return (
        <ul className="listado-proyectos">
            {
                alert ? (
                    <div className={`alerta ${alert.category}`}>
                        {alert.msg}
                    </div>
                ) : (
                    projects.map((project, index) => {
                        return <ProjectItem key={project._id} project={project} />
                    })
                )
            }
        </ul>
    );
}
 
export default ListProjects;
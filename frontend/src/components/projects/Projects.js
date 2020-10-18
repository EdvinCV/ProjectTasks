import React, {useContext, useEffect} from 'react';
// Components
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import authContext from '../../context/Authentication/authContext';

const Projects = () => {
    const {userAuthenticated} = useContext(authContext);

    useEffect(() => {
        userAuthenticated();
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Navbar />
                <main>
                    <TaskForm />
                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;
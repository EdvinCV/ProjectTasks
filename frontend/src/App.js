import React from 'react';
// Routing
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Projects from './components/projects/Projects';
// Context provider
import ProjectState from './context/Projects/projectsState';
import TaskState from './context/Tasks/taskState';
import AlertState from './context/Alerts/alertState';
import AuthState from './context/Authentication/authState';
import authToken from './config/setToken';
import PrivateRoute from './components/routes/PrivateRoute';

const token = localStorage.getItem('token');
if(token){
  authToken(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;

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

function App() {
  return (
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/projects" component={Projects} />
          </Switch>
        </Router>
      </TaskState>
    </ProjectState>
  );
}

export default App;

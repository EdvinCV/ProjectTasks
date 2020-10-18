import React, {useState, useContext, useEffect} from 'react';
// React Router
import {Link} from 'react-router-dom';
import alertContext from '../../context/Alerts/alertContext';
import authContext from '../../context/Authentication/authContext';

const Login = (props) => {
    const {alert, showAlertFn} = useContext(alertContext);
    const { message, authenticated, loginUserFn, userAuthenticated} = useContext(authContext);

    useEffect(() => {
        if(localStorage.getItem('token')){
            userAuthenticated();
        }
        if(authenticated){
            props.history.push('/projects');
        }
        if(message){
            showAlertFn(message.message, message.category);
        }
    }, [message, authenticated, props.history]);
    // State
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const {email, password} = loginForm;

    // Handle changes on inputs
    const handleChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    }
    // Handle login form submit
    const handleSubmit = e => {
        e.preventDefault();
        // Validate inputs
        if(email.trim() === '' || password.trim() === ''){
            showAlertFn('All the fields are required', 'alerta-error');
            return;
        }
        loginUserFn(loginForm);
    }
    return (
        <div className="user-form">
            {alert ?
                (<div className={`alerta alerta-error`}>
                    {alert.msg}
                </div> )
                :
                null
            }
            <div className="form-container sombra-dark">
                <h2>Login ProjectTasks</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Login"/>
                    </div>
                </form>

                <Link to={'/register'} className="enlace-cuenta">
                    Create an account
                </Link>
            </div>
        </div>
    );
}
 
export default Login;
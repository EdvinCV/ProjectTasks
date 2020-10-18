import React, {useState, useContext, useEffect} from 'react';
// React router
import {Link} from 'react-router-dom';
import alertContext from '../../context/Alerts/alertContext';
import authContext from '../../context/Authentication/authContext';

const Register = (props) => {
    // Contexts
    const {alert, showAlertFn} = useContext(alertContext);
    const { message, authenticated, createUserFn} = useContext(authContext);
    // User register or detect an error
    useEffect(() => {
        if(authenticated){
            props.history.push('/projects');
        }
        if(message){
            showAlertFn(message.message, message.category);
        }
    }, [message, authenticated, props.history]);
    // State
    const [loginForm, setLoginForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const {username, email, password, confirmPassword} = loginForm;

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
        if(username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
            showAlertFn("All the fields are required", "alert-error");
            return;
        }
        // Password validate
        if(password.length < 6){
            showAlertFn("Password must have at least 6 characters", "alert-error");
            return;
        }
        // Validate the two passwords are equal
        if(password !== confirmPassword){
            showAlertFn("Passwords don't match", "alert-error");
            return;
        }

        createUserFn(loginForm);

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
                <h2>Create your account ProjectTasks</h2>
                
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="campo-form">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Register"/>
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}
 
export default Register;
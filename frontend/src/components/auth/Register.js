import React, {useState} from 'react';
// React router
import {Link} from 'react-router-dom';

const Register = () => {
    document.title = "Project-Tasks - Register"
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
        // Password validate

    }
    return (
        <div className="user-form">
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
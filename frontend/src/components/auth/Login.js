import React, {useState} from 'react';
// React Router
import {Link} from 'react-router-dom';

const Login = () => {
    document.title = "Project-Tasks - Login"
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

    }

    return (
        <div className="user-form">
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
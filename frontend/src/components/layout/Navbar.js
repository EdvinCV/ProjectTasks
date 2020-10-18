import React, { useContext } from 'react'
import authContext from '../../context/Authentication/authContext';

const Navbar = () => {
    const {logoutFn} = useContext(authContext);
    return (
        <header className="app-header">
            <p className="nombre-usuario">
                Hello, <span>Edvin Calderón</span>
            </p>
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logoutFn()}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
 
export default Navbar;
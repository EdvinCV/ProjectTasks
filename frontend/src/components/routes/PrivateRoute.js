import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/Authentication/authContext';


const PrivateRoute = ({component: Component, ...props}) => {
    // Context
    const {authenticated, userAuthenticated, loading} = useContext(authContext);

    useEffect(() => {
        userAuthenticated();
    }, [])

    return (
        <Route {...props} render={props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )}
        />
    );
}
 
export default PrivateRoute;
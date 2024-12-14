import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as JWT from 'jwt-decode';

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = JWT(accessToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            // Token expired
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return <Navigate to="/login" />;
        }
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return <Navigate to="/login" />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute;
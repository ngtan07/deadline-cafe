import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center mt-5">Loading...</div>; // Or a proper spinner component
    }

    if (!user) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // user is logged in but does not have the required role
        return <Navigate to="/" replace />; // Redirect to home or a 403 Forbidden page
    }

    return children;
};

export default ProtectedRoute;

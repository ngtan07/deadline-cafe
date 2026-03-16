import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminRoutes from './AdminRoutes';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? <Navigate to="/" replace /> : children;
};

function AppRoutes() {
    return (
        <Routes>

            {/* Auth Route */}
            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
            <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

            {/* Public Route */}
            <Route path='/*' element={<PublicRoutes />} />

            {/* User Route */}
            <Route path='/user/*' element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <UserRoutes />
                </ProtectedRoute>
            } />

            {/* Admin Route */}
            <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminRoutes />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRoutes;

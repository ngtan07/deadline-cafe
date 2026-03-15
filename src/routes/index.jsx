import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminRoutes from './AdminRoutes';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';

function AppRoutes() {
    return (
        <Routes>

            {/* Auth Route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public Route */}
            <Route path='/*' element={<PublicRoutes />} />

            {/* User Route */}
            <Route path='/user/*' element={<UserRoutes />} />

            {/* Admin Route */}
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    );
}

export default AppRoutes;

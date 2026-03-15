import { Route, Routes } from "react-router-dom";

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUser from '../pages/admin/ManageUser'
import ManageCafe from '../pages/admin/ManageCafe'
import AdminLayout from "../components/layout/admin/AdminLayout";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="manage-users" element={<ManageUser />} />
                <Route path="manage-cafe" element={<ManageCafe />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
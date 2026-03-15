import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    return (
        <div className="d-flex min-vh-100 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <Sidebar />

            <main className="flex-grow-1 h-100 overflow-auto position-relative d-flex flex-column" style={{ maxHeight: '100vh' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
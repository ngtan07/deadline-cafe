import { Coffee, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin", end: true },
    { label: "Cafe Management", icon: Coffee, href: "/admin/manage-cafe" },
    { label: "User Management", icon: Users, href: "/admin/manage-users" },
];

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    return (
        <div
            className="d-flex flex-column bg-white border-end shadow-sm p-3"
            style={{ width: '280px', minHeight: '100vh', zIndex: 1000 }}
        >
            {/* Brand Section */}
            <div className="d-flex align-items-center gap-2 mb-3 px-2 border-bottom pb-3">
                <div
                    className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm"
                    style={{ backgroundColor: 'var(--primary-btn)' }}
                >
                    <Coffee size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <span className="fs-5 fw-bold d-block" style={{ letterSpacing: '-0.5px', color: 'var(--primary-btn)', lineHeight: 1.2 }}>Dehofee</span>
                    <span className="text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin</span>
                </div>
            </div>

            {/* Navigation links */}
            <Nav className="flex-column flex-grow-1 gap-1">
                {NAV_ITEMS.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.href}
                        end={item.end}
                        className={({ isActive }) =>
                            `d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all ` +
                            (isActive
                                ? 'active-nav-link fw-semibold'
                                : 'text-secondary hover-bg-light')
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}

                {/* Footer items (Settings & Logout) */}
                <div className="mt-auto pt-3 border-top d-flex flex-column gap-1">
                    <NavLink
                        to="/admin/setting"
                        className={({ isActive }) =>
                            `d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all ` +
                            (isActive
                                ? 'active-nav-link fw-semibold'
                                : 'text-secondary hover-bg-light')
                        }
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink>

                    <Link
                        to="/"
                        onClick={handleLogout}
                        className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-danger transition-all bg-danger-hover"
                        style={{ outline: "none" }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </Nav>

            <style>
                {`
                    .transition-all { transition: all 0.2s ease; }
                    
                    /* Custom Brown Theme Styles */
                    .active-nav-link { 
                        background-color: color-mix(in srgb, var(--primary-btn) 12%, transparent);
                        color: var(--primary-btn) !important; 
                        font-weight: 700 !important;
                    }
                    
                    .hover-bg-light:hover { 
                        background-color: #f8f9fa; 
                        color: var(--primary-btn) !important; 
                    }
                    
                    .bg-danger-hover:hover { 
                        background-color: #fef2f2; 
                        color: #dc2626 !important; 
                    }
                `}
            </style>
        </div>
    )
}

export default Sidebar;

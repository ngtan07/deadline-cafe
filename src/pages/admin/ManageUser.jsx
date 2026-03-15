import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

import { useAdminDashboardData } from '../../hooks/admin/useAdminDashboardData';
import { useUserManagement } from '../../hooks/admin/useUserManagement';
import { useUserFilter } from '../../hooks/admin/useUserFilter';

import UserTable from '../../components/domain/admin/user/UserTable';
import UserFormModal from '../../components/domain/admin/user/UserFormModal';
import StatCard from '../../components/common/admin/StatCard';
import ConfirmDeleteModal from '../../components/common/admin/ConfirmDeleteModal';
import { Users, ShieldCheck, User, Search, Plus } from 'lucide-react';

const BROWN = '#8B3A2A';

const ManageUser = () => {
    const { usersList, setUsersList } = useAdminDashboardData();

    const {
        showModal, currentUser, formData,
        handleInputChange, handleShowModal, handleCloseModal, handleSubmit, handleDelete,
        handleShowConfirm, setShowDeleteModal, showDeleteModal
    } = useUserManagement(setUsersList);

    const {
        searchQuery, setSearchQuery,
        roleFilter, setRoleFilter,
        filteredUsers
    } = useUserFilter(usersList);

    // Compute stats
    const totalUsers = usersList.length;
    const adminCount = usersList.filter(u => u.role === 'admin').length;
    const userCount = usersList.filter(u => u.role === 'user').length;

    const statCards = [
        { icon: Users, label: 'Total Users', value: totalUsers, color: BROWN, delay: 0.05 },
        { icon: ShieldCheck, label: 'Administrators', value: adminCount, color: '#5B8DD9', delay: 0.1 },
        { icon: User, label: 'Regular Users', value: userCount, color: '#F5A623', delay: 0.15 },
    ];

    return (
        <div className="p-4 p-lg-5 overflow-auto" style={{ minHeight: '100vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold mb-1" style={{ color: 'var(--primary-btn)', fontSize: '1.75rem' }}>User Management</h1>
                        <p className="text-muted mb-0">Manage system administrators and regular users.</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <div className="bg-white px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2 fw-medium text-dark" style={{ fontSize: '0.85rem' }}>
                            Admin <Users size={16} style={{ color: BROWN }} />
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <Row className="g-4 mb-4">
                    {statCards.map((s, i) => (
                        <Col xs={12} sm={6} xl={4} key={i}>
                            <StatCard {...s} />
                        </Col>
                    ))}
                </Row>

                {/* Filters & Actions */}
                <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
                    <div>
                        <h4 className="fw-bold mb-0 text-dark">List of Users</h4>
                        <p className="text-muted mb-0 small">
                            Showing {filteredUsers?.length || 0} / {usersList?.length || 0} users
                        </p>
                    </div>

                    <div className="d-flex flex-wrap flex-md-nowrap align-items-center gap-2" style={{ justifyContent: 'flex-end' }}>
                        {/* Search Input */}
                        <InputGroup
                            className="shadow-sm rounded-pill overflow-hidden"
                            style={{ minWidth: '280px', maxWidth: '380px', flex: 1 }}
                        >
                            <InputGroup.Text className="bg-white border-0 ps-3 pe-2 text-muted">
                                <Search size={16} />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search user by name or email..."
                                className="border-0 shadow-none bg-white py-2 pe-3"
                                style={{ fontSize: '0.85rem' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>

                        {/* Role Filter */}
                        <Form.Select
                            className="shadow-sm rounded-pill border-0 py-2 text-muted fw-medium"
                            style={{ minWidth: '160px', fontSize: '0.85rem', cursor: 'pointer' }}
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Administrators</option>
                            <option value="user">Regular Users</option>
                        </Form.Select>
                    </div>
                </div>

                <UserTable
                    usersList={filteredUsers || []}
                    onEdit={handleShowModal}
                    onDelete={handleShowConfirm}
                />
            </motion.div>

            <UserFormModal
                showModal={showModal}
                currentUser={currentUser}
                formData={formData}
                handleInputChange={handleInputChange}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
            />

            <ConfirmDeleteModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                handleConfirm={handleDelete}
                currentCafe={{ name: currentUser?.name || 'this user' }}
                title="Confirm Ban?"
                actionText="Ban"
                message={<>Are you sure you want to ban <b>{currentUser?.name || 'this user'}</b>? <br />They will no longer be able to access the system.</>}
            />
        </div>
    );
};

export default ManageUser;

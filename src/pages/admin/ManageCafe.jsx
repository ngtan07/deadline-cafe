import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

import { useAdminDashboardData } from '../../hooks/admin/useAdminDashboardData';
import { useCafeManagement } from '../../hooks/admin/useCafeManagement';
import { useCafeFilter } from '../../hooks/admin/useCafeFilter';

import CafeTable from '../../components/domain/admin/cafe/CafeTable';
import CafeFormModal from '../../components/domain/admin/cafe/CafeFormModal';
import StatCard from '../../components/common/admin/StatCard';
import { Users, Coffee, Star, MessageSquare, Plus, Search, Filter } from 'lucide-react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import ConfirmDeleteModal from '../../components/common/admin/ConfirmDeleteModal';

const BROWN = '#8B3A2A';

const ManageCafe = () => {
    const {
        cafesList, setCafesList, locationsList,
        totalCafes, totalReviews, avgRating
    } = useAdminDashboardData();

    const {
        showModal, currentCafe, formData,
        handleInputChange, handleShowModal, handleCloseModal, handleSubmit, handleDelete,
        handleShowConfirm, setShowDeleteModal, showDeleteModal
    } = useCafeManagement(locationsList, setCafesList);

    const {
        searchQuery, setSearchQuery,
        locationFilter, setLocationFilter,
        ratingFilter, setRatingFilter,
        filteredCafes
    } = useCafeFilter(cafesList);

    const statCards = [
        { icon: Coffee, label: 'Total Cafes', value: totalCafes, color: BROWN, delay: 0.05 },
        { icon: MessageSquare, label: 'Total Reviews', value: totalReviews, color: '#5B8DD9', delay: 0.1 },
        { icon: Star, label: 'Average Rating', value: avgRating, color: '#F5A623', delay: 0.15 },
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
                        <h1 className="fw-bold mb-1" style={{ color: 'var(--primary-btn)', fontSize: '1.75rem' }}>Cafe Management</h1>
                        <p className="text-muted mb-0">Manage all cafe listings in the Dehofee system.</p>
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

                <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
                    <div>
                        <h4 className="fw-bold mb-0 text-dark">List of Cafes</h4>
                        <p className="text-muted mb-0 small">
                            Showing {filteredCafes?.length || 0} / {cafesList?.length || 0} cafes
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
                                placeholder="Search cafe..."
                                className="border-0 shadow-none bg-white py-2 pe-3"
                                style={{ fontSize: '0.85rem' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </InputGroup>

                        {/* Location Filter */}
                        <Form.Select
                            className="shadow-sm rounded-pill border-0 py-2 text-muted fw-medium"
                            style={{ minWidth: '150px', fontSize: '0.85rem', cursor: 'pointer' }}
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        >
                            <option value="">All Locations</option>
                            {locationsList?.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </Form.Select>

                        {/* Rating Filter */}
                        <Form.Select
                            className="shadow-sm rounded-pill border-0 py-2 text-muted fw-medium"
                            style={{ minWidth: '150px', fontSize: '0.85rem', cursor: 'pointer' }}
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                        >
                            <option value="">All Ratings</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="4.0">4.0+ Stars</option>
                            <option value="3.0">3.0+ Stars</option>
                        </Form.Select>

                        {/* Add New Button */}
                        <Button
                            variant="none"
                            className="px-4 py-2 d-flex flex-nowrap align-items-center gap-2 rounded-pill shadow-sm text-white ms-lg-2"
                            style={{ backgroundColor: BROWN, border: `1px solid ${BROWN}`, whiteSpace: 'nowrap' }}
                            onClick={() => handleShowModal()}
                        >
                            <Plus size={16} /> Add New
                        </Button>
                    </div>
                </div>

                <CafeTable
                    cafesList={filteredCafes || []}
                    locationsList={locationsList}
                    onEdit={handleShowModal}
                    onDelete={handleShowConfirm}
                />
            </motion.div>

            <CafeFormModal
                showModal={showModal}
                currentCafe={currentCafe}
                formData={formData}
                locationsList={locationsList}
                handleInputChange={handleInputChange}
                handleCloseModal={handleCloseModal}
                handleSubmit={handleSubmit}
            />

            <ConfirmDeleteModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                handleConfirm={handleDelete}
                currentCafe={currentCafe}
            />
        </div>
    );
};

export default ManageCafe;

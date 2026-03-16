import { Coffee } from "lucide-react"
import { Col, Form, Row } from "react-bootstrap"
import { motion } from 'framer-motion';
import CafeCard from './CafeCard'
import { useAuth } from "../../../../contexts/AuthContext";

const CafeList = ({ favoritesFilter, setFavoritesFilter, isLoading, errorMsg, filteredCafes,
    toggleFavorite, favoritesList, locations, getIcon
}) => {

    const { user } = useAuth();
    
    const getLocationName = (locationId) =>
        locations?.find((loc) => loc.id === locationId)?.name || 'Unknown';

    const formatPrice = (price) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return (
        <Col lg={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div />
                {user && (
                    <Form.Check
                        type="switch"
                        className="custom-switch-md"
                        id="favorite-switch"
                        label="Show favorite cafes"
                        checked={favoritesFilter}
                        onChange={(e) => setFavoritesFilter(e.target.checked)}
                        style={{ fontWeight: '500' }}
                    />
                )}
            </div>

            {isLoading && <div>Loading data...</div>}
            {errorMsg && <div className="text-danger">{errorMsg}</div>}
            {!isLoading && !errorMsg && filteredCafes.length === 0 && (
                <div className="text-center text-muted py-5">
                    <Coffee size={48} className="mb-3 opacity-50" />
                    <h5>No matching cafes found.</h5>
                </div>
            )}

            <Row className="g-4">
                {filteredCafes.map((cafe, index) => (
                    <Col md={6} xl={4} key={cafe.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <CafeCard
                                cafe={cafe}
                                toggleFavorite={toggleFavorite}
                                favoritesList={favoritesList}
                                getLocationName={getLocationName}
                                formatPrice={formatPrice}
                                getIcon={getIcon}
                            />
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </Col>
    )
}

export default CafeList

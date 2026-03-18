import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';

const CafeCard = ({ cafe, toggleFavorite, favoritesList, getLocationName, formatPrice, getIcon }) => {
    return (
        <Link to={`/cafe/${cafe.id}`} className="text-decoration-none text-dark">
            <div className="modern-card h-100 d-flex flex-column bg-white border border-light shadow-sm rounded-4 overflow-hidden">
                <div className="position-relative" style={{ overflow: 'hidden', height: '220px' }}>
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src={cafe.image}
                        alt={cafe.name}
                        className="w-100 h-100 object-fit-cover"
                    />

                    {/* Heart Toggle */}
                    <div
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{ top: '16px', left: '16px', cursor: 'pointer', zIndex: 10 }}
                        onClick={(e) => toggleFavorite(e, cafe.id)}
                    >
                        <motion.div whileTap={{ scale: 0.8 }}>
                            <Heart
                                size={26}
                                color={favoritesList.includes(cafe.id) ? '#EF4444' : '#ffffff'}
                                fill={favoritesList.includes(cafe.id) ? '#EF4444' : 'rgba(0,0,0,0.3)'}
                            />
                        </motion.div>
                    </div>

                    <div
                        className="position-absolute bg-white px-2 py-1 rounded-pill d-flex align-items-center gap-1 shadow-sm"
                        style={{ top: '12px', right: '12px', fontSize: '14px', fontWeight: '600' }}
                    >
                        <Star size={16} color="#F59E0B" fill="#F59E0B" />
                        {cafe.rating != null ? Number(cafe.rating).toFixed(1) : '—'}
                    </div>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                    <h5 className="fw-bold mb-2 text-truncate" title={cafe.name}>
                        {cafe.name}
                    </h5>
                    <p className="text-muted small d-flex align-items-center gap-1 mb-2 text-truncate">
                        <MapPin size={14} />
                        {getLocationName(cafe.locationId)} — {cafe.address}
                    </p>
                    <p className="fw-semibold mb-3 small" style={{ color: 'var(--primary-btn)' }}>
                        {formatPrice(cafe.priceRange.min)} - {formatPrice(cafe.priceRange.max)}
                    </p>

                    <div className="d-flex flex-wrap gap-2 mt-auto">
                        {cafe.amenities.slice(0, 3).map((amenity) => (
                            <span key={amenity} className="modern-badge">
                                {getIcon(amenity)} {amenity}
                            </span>
                        ))}
                        {cafe.amenities.length > 3 && (
                            <span className="modern-badge bg-light text-muted">
                                +{cafe.amenities.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CafeCard

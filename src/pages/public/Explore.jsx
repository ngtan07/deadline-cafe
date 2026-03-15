import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Zap, VolumeX, Wind, Coffee, TreePine, Car, Heart } from 'lucide-react';
import { useCafeFilter } from '../../hooks/useCafeFilter';
import { cafeService } from '../../services/cafeService';
import { locationService } from '../../services/locationService';

const getIcon = (amenity) => {
  switch (amenity) {
    case 'Wifi 5G': return <Wifi size={14} className="me-1" />;
    case 'Power Plugs': return <Zap size={14} className="me-1" />;
    case 'Quiet Zone': return <VolumeX size={14} className="me-1" />;
    case 'Air Con': return <Wind size={14} className="me-1" />;
    case 'Specialty Coffee': return <Coffee size={14} className="me-1" />;
    case 'Garden': return <TreePine size={14} className="me-1" />;
    case 'Parking': return <Car size={14} className="me-1" />;
    default: return null;
  }
};

const ALL_AMENITIES = ['Wifi 5G', 'Quiet Zone', 'Power Plugs', 'Air Con', 'Specialty Coffee', 'Garden', 'Parking', 'Group Tables', 'Lake View'];

const Explore = () => {
  const [cafes, setCafes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  const {
    setSearchQuery,
    locationFilter, setLocationFilter,
    priceFilter, setPriceFilter,
    amenitiesFilter,
    favoritesFilter, setFavoritesFilter,
    favoritesList,
    sortBy, setSortBy,
    toggleFavorite,
    toggleAmenity,
    filteredCafes,
  } = useCafeFilter(cafes, locations);


  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [cafesData, locationsData] = await Promise.all([
          cafeService.getAll(),
          locationService.getAll(),
        ]);
        setCafes(cafesData);
        setLocations(locationsData);
        setErrorMsg(null);
      } catch (err) {
        setErrorMsg(err.message || 'Error loading data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLocationName = (locationId) =>
    locations?.find((loc) => loc.id === locationId)?.name || 'Unknown';

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <Container className="py-5">
      <Row className="mb-5 align-items-center">
        <Col md={8}>
          <motion.h2
            className="fw-bold mb-2"
            style={{ color: 'var(--primary-btn)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Explore Spaces
          </motion.h2>
          <p className="text-muted">
            {search
              ? `Search results for: "${search}"`
              : 'Find the perfect cafe for those intense deadline days.'}
          </p>
        </Col>
      </Row>

      <Row>
        {/* Sidebar Filter - Left */}
        <Col lg={3} className="mb-4">
          <div className="bg-white p-4 rounded-4 shadow-sm border-0 sticky-top" style={{ top: '90px' }}>
            <h5 className="fw-bold mb-4" style={{ color: 'var(--primary-btn)' }}>Filter List</h5>

            {/* Area */}
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Area</Form.Label>
              <div className="d-flex flex-column gap-2">
                <Form.Check
                  type="radio"
                  id="district-all"
                  label="All Areas"
                  name="districtFilter"
                  checked={locationFilter === 'All'}
                  onChange={() => setLocationFilter('All')}
                  className="cursor-pointer"
                />
                {locations.map((loc) => (
                  <Form.Check
                    key={loc.id}
                    type="radio"
                    id={`district-${loc.id}`}
                    label={loc.name}
                    name="districtFilter"
                    checked={locationFilter === loc.id}
                    onChange={() => setLocationFilter(loc.id)}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </Form.Group>

            {/* Amenities */}
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Amenities</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {ALL_AMENITIES.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    className={`modern-badge border-0 ${amenitiesFilter.includes(amenity) ? 'text-white' : ''}`}
                    style={amenitiesFilter.includes(amenity) ? { backgroundColor: 'var(--primary-btn)' } : {}}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {getIcon(amenity)} {amenity}
                  </button>
                ))}
              </div>
            </Form.Group>

            {/* Price Range */}
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Price Range</Form.Label>
              <Form.Select
                className="rounded-pill shadow-none border-1"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="All">All Prices</option>
                <option value="Under50k">Under 50,000đ</option>
                <option value="50k-100k">50,000đ - 100,000đ</option>
                <option value="Over100k">Over 100,000đ</option>
              </Form.Select>
            </Form.Group>

            {/* Sort By */}
            <Form.Group>
              <Form.Label className="text-muted fw-semibold small text-uppercase">Sort By</Form.Label>
              <Form.Select
                className="rounded-pill shadow-none border-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ratingDesc">Highest Rated</option>
                <option value="ratingAsc">Lowest Rated</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Col>

        {/* Gallery - Right */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div />
            <Form.Check
              type="switch"
              className="custom-switch-md"
              id="favorite-switch"
              label="Show favorite cafes"
              checked={favoritesFilter}
              onChange={(e) => setFavoritesFilter(e.target.checked)}
              style={{ fontWeight: '500' }}
            />
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
                  <Link to={`/user/cafe/${cafe.id}`} className="text-decoration-none text-dark">
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
                          {cafe.rating.toFixed(1)}
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
                </motion.div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;

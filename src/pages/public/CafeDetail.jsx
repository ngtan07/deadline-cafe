import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Star, MapPin, Clock, DollarSign, Send, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { cafeService } from '../../services/cafeService';
import { reviewService } from '../../services/reviewService';
import { locationService } from '../../services/locationService';
import ReviewSection from '../../components/domain/user/detail/ReviewSection';

const CafeDetail = () => {
  const { id } = useParams();

  const [cafe, setCafe] = useState(null);
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem('favoriteCafes');
    const favorites = saved ? JSON.parse(saved) : [];
    return favorites.includes(id);
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [cafeData, reviewsData, locationsData] = await Promise.all([
          cafeService.getByIdWithRating(id),
          reviewService.getByCafeExpandUser(id),
          locationService.getAll(),
        ]);
        setCafe(cafeData);
        setReviews(reviewsData.reverse());
        setLocations(locationsData);
      } catch (err) {
        setErrorMsg('Error loading cafe data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleToggleFavorite = () => {
    const saved = localStorage.getItem('favoriteCafes');
    let favorites = saved ? JSON.parse(saved) : [];

    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
      setIsFavorite(false);
    } else {
      favorites.push(id);
      setIsFavorite(true);
    }

    localStorage.setItem('favoriteCafes', JSON.stringify(favorites));
  };

  if (isLoading) return <Container className="py-5 text-center">Loading details...</Container>;
  if (errorMsg || !cafe) return <Container className="py-5 text-center text-danger">{errorMsg || 'Cafe not found.'}</Container>;

  const locationName = locations?.find(loc => loc.id === cafe.locationId)?.name || 'Unknown';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };



  return (
    <Container className="py-5">
      <Row className="gx-5">
        {/* Left Col: Image & Description */}
        <Col lg={7} className="mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="position-relative mb-4"
          >
            <img
              src={cafe.image}
              alt={cafe.name}
              className="w-100 object-fit-cover rounded-4 shadow-sm"
              style={{ height: '450px' }}
            />
            <div
              className="position-absolute bg-white px-3 py-2 rounded-pill d-flex align-items-center gap-1 shadow"
              style={{ bottom: '20px', right: '20px', fontWeight: '700', fontSize: '1.2rem' }}
            >
              <Star size={20} color="#F59E0B" fill="#F59E0B" />
              {reviewService.computeAverageRating(reviews) != null
                ? reviewService.computeAverageRating(reviews).toFixed(1)
                : cafe.rating ?? '—'}
            </div>
          </motion.div>

          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="fw-bold mb-0" style={{ color: 'var(--primary-btn)' }}>{cafe.name}</h1>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ cursor: 'pointer' }}
              onClick={handleToggleFavorite}
            >
              <Heart
                size={32}
                color={isFavorite ? "#EF4444" : "#9CA3AF"}
                fill={isFavorite ? "#EF4444" : "none"}
                style={{ transition: '0.2s' }}
              />
            </div>
          </div>

          <p className="fs-5 mb-4" style={{ lineHeight: '1.8', color: 'var(--text-main)' }}>
            {cafe.description}
          </p>

          <div className="d-flex flex-wrap gap-2 mb-5">
            {cafe.amenities?.map(amenity => (
              <span key={amenity} className="modern-badge bg-white shadow-sm border text-dark">
                {amenity}
              </span>
            ))}
          </div>
        </Col>

        {/* Right Col: Info & Reviews */}
        <Col lg={5}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-4 shadow-sm mb-5 border-0"
          >
            <h4 className="fw-bold mb-4 border-bottom pb-3" style={{ color: 'var(--primary-btn)' }}>General Information</h4>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <MapPin size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Address</p>
                <p className="mb-0 fw-medium" style={{ color: 'var(--text-main)' }}>{locationName} — {cafe.address}</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <Clock size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Opening Hours</p>
                <p className="mb-0 fw-medium" style={{ color: 'var(--text-main)' }}>{cafe.openHours}</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-light p-2 rounded-circle text-primary">
                <DollarSign size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Price Range</p>
                <p className="mb-0 fw-medium" style={{ color: 'var(--text-main)' }}>{formatPrice(cafe.priceRange.min)} - {formatPrice(cafe.priceRange.max)}</p>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <ReviewSection reviews={reviews} cafeId={id} />

        </Col>
      </Row>
    </Container>
  );
};

export default CafeDetail;

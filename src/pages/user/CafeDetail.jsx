import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Star, MapPin, Clock, DollarSign, Send, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { cafeService } from '../../services/cafeService';
import { reviewService } from '../../services/reviewService';
import { locationService } from '../../services/locationService';
import { userService } from '../../services/userService';

const CafeDetail = () => {
  const { id } = useParams();

  const [cafe, setCafe] = useState(null);
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const displayedReviews = reviews.slice(0, 3);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

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
          cafeService.getById(id),
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview = {
      cafeId: id,
      userId: "user1",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const savedReview = await reviewService.create(newReview);

      const userRes = await userService.getById("user1");
      const reviewWithUser = { ...savedReview, user: userRes };

      setReviews([reviewWithUser, ...reviews]);
      setNewComment('');
      setNewRating(5);
    } catch (err) {
      alert("Error submitting review.");
    }
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
              {cafe.rating}
            </div>
          </motion.div>

          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="fw-bold mb-0">{cafe.name}</h1>
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

          <p className="text-muted fs-5 mb-4" style={{ lineHeight: '1.8' }}>
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
            <h4 className="fw-bold mb-4 border-bottom pb-3">General Information</h4>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <MapPin size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Address</p>
                <p className="mb-0 fw-medium">{locationName} — {cafe.address}</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <Clock size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Opening Hours</p>
                <p className="mb-0 fw-medium">{cafe.openHours}</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-light p-2 rounded-circle text-primary">
                <DollarSign size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Price Range</p>
                <p className="mb-0 fw-medium">{formatPrice(cafe.priceRange.min)} - {formatPrice(cafe.priceRange.max)}</p>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <div className="mb-4">
            <h4 className="fw-bold mb-4">Community Reviews ({reviews.length})</h4>

            <Form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
              <h6 className="fw-bold mb-3">Leave a review</h6>
              <div className="d-flex mb-3 gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="cursor-pointer"
                    color={star <= (hoverRating || newRating) ? "#F59E0B" : "#DDD"}
                    fill={star <= (hoverRating || newRating) ? "#F59E0B" : "none"}
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ cursor: 'pointer', transition: '0.2s' }}
                  />
                ))}
              </div>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Share your deadline experience here..."
                  style={{ borderRadius: '12px', resize: 'none' }}
                  className="bg-light border-0 shadow-none px-3 py-3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="none" className="btn-primary-modern w-100 d-flex justify-content-center align-items-center gap-2">
                <Send size={18} /> Submit Review
              </Button>
            </Form>

            {/* Bubble-style reviews */}
            <div className="d-flex flex-column gap-3">
              {displayedReviews.map((review) => (
                <div key={review.id} className="d-flex gap-3">
                  <img
                    src={review.user?.avatar || "https://i.pravatar.cc/150?u=default"}
                    alt="avatar"
                    className="rounded-circle object-fit-cover shadow-sm"
                    width={48} height={48}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold">{review.user?.name || "Anonymous User"}</span>
                      <span className="text-muted small">{review.date}</span>
                    </div>
                    <div className="d-flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} color="#F59E0B" fill={i < review.rating ? "#F59E0B" : "none"} />
                      ))}
                    </div>
                    <div className="bubble-review shadow-sm border-0">
                      {review.comment}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="text-center mt-4">
                <Link to={`/cafe/${id}/reviews`} className="btn btn-outline-secondary rounded-pill px-4">
                  View all {reviews.length} reviews
                </Link>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CafeDetail;

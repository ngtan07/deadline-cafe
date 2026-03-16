import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Star, Send, ArrowLeft, MessageCircle, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { cafeService } from '../../services/cafeService';
import { reviewService } from '../../services/reviewService';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import LoginPromptModal from '../../components/common/LoginPromptModal';
import StarRatingPicker from '../../components/domain/user/StarRatingPicker';
import ReviewCard from '../../components/domain/user/review/ReviewCard';


const CafeReviews = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [cafe, setCafe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [ratingFilter, setRatingFilter] = useState('all');

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [cafeData, reviewsData] = await Promise.all([
          cafeService.getById(id),
          reviewService.getByCafeExpandUser(id),
        ]);
        setCafe(cafeData);
        setReviews(reviewsData.reverse());
      } catch (err) {
        console.error('Error loading reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Derived filtered reviews
  const filteredReviews = useMemo(() => {
    if (ratingFilter === 'all') return reviews;
    return reviews.filter(rev => Math.floor(rev.rating) === parseInt(ratingFilter));
  }, [reviews, ratingFilter]);

  const handleFocusOrClick = () => {
    if (!user) setShowLoginModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { setShowLoginModal(true); return; }
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const newReview = {
        cafeId: id,
        userId: user.id,
        rating,
        comment: comment.trim(),
        date: new Date().toISOString(),
      };

      const savedReview = await reviewService.create(newReview);

      let reviewWithUser;
      try {
        const userRes = await userService.getById(user.id);
        reviewWithUser = { ...savedReview, user: userRes };
      } catch {
        reviewWithUser = { ...savedReview, user };
      }

      setReviews((prev) => [reviewWithUser, ...prev]);
      setComment('');
      setRating(5);
      setRatingFilter('all'); // Reset filter to show new review
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again!');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Container className="py-5 text-center" style={{ color: 'var(--text-main)' }}>Loading reviews...</Container>;

  return (
    <Container className="py-5" style={{ maxWidth: '900px' }}>
      {/* Back link */}
      <Link to={`/cafe/${id}`} className="text-decoration-none mb-4 d-inline-flex align-items-center gap-1 fw-medium" style={{ color: 'var(--text-muted)' }}>
        <ArrowLeft size={18} />
        Back to <span style={{ color: 'var(--primary-btn)' }}>{cafe?.name}</span>
      </Link>

      <Row className="mb-4 mt-3 align-items-end">
        <Col>
          <h2 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: 'var(--primary-btn)' }}>
            <MessageCircle size={32} />
            Reviews & Feedback
            <span className="badge bg-white shadow-sm text-dark border fw-semibold ms-2" style={{ fontSize: '0.9rem', color: 'var(--text-main) !important' }}>
              {reviews.length}
            </span>
          </h2>
          <p className="text-muted mb-0 mt-1">What our community says about this workspace</p>
        </Col>
      </Row>

      <Row className="gx-4">
        {/* Left Column: Form & Filters */}
        <Col lg={5} className="mb-4">
          <div className="sticky-top" style={{ top: '20px' }}>
            {/* Review Form */}
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
              <h6 className="fw-bold mb-3" style={{ color: 'var(--text-main)' }}>
                {user ? `Hi, ${user.name}! Share your experience` : 'Write a Review'}
              </h6>

              <div className="mb-3">
                <StarRatingPicker rating={rating} onChange={setRating} />
              </div>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder={user ? 'How was the wifi, coffee, and atmosphere?' : 'Log in to write a review...'}
                  style={{ borderRadius: '16px', resize: 'none', background: '#fcfaf9' }}
                  className="border-0 shadow-none px-3 py-3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onFocus={handleFocusOrClick}
                  readOnly={!user}
                />
              </Form.Group>

              <Button
                type={user ? 'submit' : 'button'}
                variant="none"
                className="btn-primary-modern w-100 d-flex justify-content-center align-items-center gap-2 py-3"
                disabled={submitting}
                onClick={!user ? handleFocusOrClick : undefined}
              >
                <Send size={18} />
                {submitting ? 'Sending...' : user ? 'Submit Review' : 'Log in to review'}
              </Button>
            </Form>

            {/* Filter Panel */}
            <div className="bg-white p-4 rounded-4 shadow-sm border-0">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Filter size={18} /> Filter Reviews
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {['all', '5', '4', '3', '2', '1'].map((star) => (
                  <Button
                    key={star}
                    variant={ratingFilter === star ? 'primary' : 'light'}
                    className={`rounded-pill px-3 py-1 small fw-medium transition-all ${ratingFilter === star ? 'btn-primary-modern text-white' : ''
                      }`}
                    style={{ fontSize: '0.85rem', color: 'var(--text-primary-btn)' }}
                    onClick={() => setRatingFilter(star)}
                  >
                    {star === 'all' ? 'All' : `${star} ★`}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column: Reviews List */}
        <Col lg={7}>
          <div className="d-flex flex-column gap-3">
            <AnimatePresence mode="popLayout">
              {filteredReviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-5 bg-white rounded-4 shadow-sm"
                >
                  <p className="text-muted mb-0">
                    {ratingFilter === 'all' ? 'No reviews yet. Be the first one!' : `No ${ratingFilter}-star reviews yet.`}
                  </p>
                </motion.div>
              ) : (
                filteredReviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))
              )}
            </AnimatePresence>
          </div>
        </Col>
      </Row>

      <LoginPromptModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </Container>
  );
};

export default CafeReviews;

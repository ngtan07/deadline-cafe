import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Star, MapPin, Clock, DollarSign, Send, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const CafeDetail = () => {
  const { id } = useParams();
  const { data: cafe, loading: cafeLoading, error: cafeError } = useFetch(`http://localhost:3000/cafes/${id}`);
  const { data: initialReviews, loading: reviewsLoading } = useFetch(`http://localhost:3000/reviews?cafeId=${id}&_expand=user`);
  
  const [reviews, setReviews] = useState([]);
  const displayedReviews = reviews.slice(0, 3);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem('favoriteCafes');
    const favorites = saved ? JSON.parse(saved) : [];
    return favorites.includes(id);
  });

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

  useEffect(() => {
    if (initialReviews) {
      setReviews(initialReviews);
    }
  }, [initialReviews]);

  if (cafeLoading || reviewsLoading) return <Container className="py-5 text-center">Đang tải chi tiết...</Container>;
  if (cafeError || !cafe) return <Container className="py-5 text-center text-danger">Lỗi khi tải dữ liệu quán.</Container>;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview = {
      cafeId: id,
      userId: "1", // Giả sử user hiện tại có id = 1
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await axios.post('http://localhost:3000/reviews', newReview);
      
      // Fetch user info for the new review instantly to display
      const userRes = await axios.get(`http://localhost:3000/users/1`);
      const reviewWithUser = { ...res.data, user: userRes.data };

      setReviews([reviewWithUser, ...reviews]);
      setNewComment('');
      setNewRating(5);
    } catch (err) {
      alert("Lỗi khi gửi đánh giá.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="gx-5">
        {/* Cột trái: Hình ảnh lớn & Mô tả ngắn */}
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

        {/* Cột phải: Thông tin & Đánh giá */}
        <Col lg={5}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-4 shadow-sm mb-5 border-0"
          >
            <h4 className="fw-bold mb-4 border-bottom pb-3">Thông tin chung</h4>
            
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <MapPin size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Địa chỉ</p>
                <p className="mb-0 fw-medium">{cafe.address}</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded-circle text-primary">
                <Clock size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Giờ mở cửa</p>
                <p className="mb-0 fw-medium">{cafe.openHours}</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-light p-2 rounded-circle text-primary">
                <DollarSign size={22} color="var(--primary-btn)" />
              </div>
              <div>
                <p className="text-muted small mb-0 fw-semibold text-uppercase">Mức giá</p>
                <p className="mb-0 fw-medium">{cafe.priceRange}</p>
              </div>
            </div>
          </motion.div>

          {/* Khu vực Reviews */}
          <div className="mb-4">
            <h4 className="fw-bold mb-4">Đánh giá Cộng đồng ({reviews.length})</h4>
            
            <Form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
              <h6 className="fw-bold mb-3">Để lại đánh giá của bạn</h6>
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
                  placeholder="Chia sẻ trải nghiệm chạy deadline của bạn tại đây..."
                  style={{ borderRadius: '12px', resize: 'none' }}
                  className="bg-light border-0 shadow-none px-3 py-3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="none" className="btn-primary-modern w-100 d-flex justify-content-center align-items-center gap-2">
                <Send size={18} /> Gửi đánh giá
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
                      <span className="fw-bold">{review.user?.name || "Người dùng ẩn danh"}</span>
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
                  Xem tất cả {reviews.length} đánh giá
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

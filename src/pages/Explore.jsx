import { useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Zap, VolumeX, Wind, Coffee, TreePine, Car, Heart } from 'lucide-react';
import useFetch from '../hooks/useFetch';

const getIcon = (amenity) => {
  switch(amenity) {
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

const Explore = () => {
  const { data: cafes, loading, error } = useFetch('http://localhost:3000/cafes');
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  
  // States
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterAmenities, setFilterAmenities] = useState([]);
  const [filterPrice, setFilterPrice] = useState('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('ratingDesc');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteCafes');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (e, cafeId) => {
    e.preventDefault(); // Prevent navigating to detail page if clicking heart on card
    e.stopPropagation();
    
    setFavorites(prev => {
      let newFavs;
      if (prev.includes(cafeId)) {
        newFavs = prev.filter(id => id !== cafeId);
      } else {
        newFavs = [...prev, cafeId];
      }
      localStorage.setItem('favoriteCafes', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFilterAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Logic filter & sort
  const processedCafes = useMemo(() => {
    if (!cafes) return [];
    
    let result = [...cafes];

    // Search filter
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(s) || 
        c.district.toLowerCase().includes(s) ||
        c.address.toLowerCase().includes(s)
      );
    }
    
    // District filter
    if (filterDistrict !== 'All') {
      result = result.filter(c => c.district === filterDistrict);
    }
    
    // Amenities filter
    if (filterAmenities.length > 0) {
      result = result.filter(c => 
        filterAmenities.every(amenity => c.amenities.includes(amenity))
      );
    }

    // Price filter
    if (filterPrice !== 'All') {
      // Basic mock parsing due to "30k - 65k" format
      result = result.filter(c => {
        // Simple heuristic for demo based on common ranges
        if (filterPrice === 'Under50k') return c.priceRange.includes('30k') || c.priceRange.includes('40k');
        if (filterPrice === '50k-100k') return c.priceRange.includes('50k') || c.priceRange.includes('60k');
        if (filterPrice === 'Over100k') return c.priceRange.includes('100k') || c.priceRange.includes('120k');
        return true;
      });
    }

    // Favorites filter
    if (showOnlyFavorites) {
      result = result.filter(c => favorites.includes(c.id));
    }

    // Sort
    if (sortBy === 'ratingDesc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'ratingAsc') {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [cafes, search, filterDistrict, filterAmenities, filterPrice, showOnlyFavorites, sortBy, favorites]);

  const districts = ['All', 'Quận 1', 'Quận 3', 'Quận 5', 'Quận 7'];
  const allAmenities = ['Wifi 5G', 'Quiet Zone', 'Power Plugs', 'Air Con', 'Specialty Coffee', 'Garden', 'Parking', 'Group Tables', 'Lake View'];

  return (
    <Container className="py-5">
      <Row className="mb-5 align-items-center">
        <Col md={8}>
          <motion.h2 
            className="fw-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Khám phá Không gian
          </motion.h2>
          <p className="text-muted">
            {search ? `Kết quả tìm kiếm cho: "${search}"` : 'Tìm quán cà phê chân ái cho những ngày chạy deadline căng thẳng.'}
          </p>
        </Col>
      </Row>

      <Row>
        {/* Sidebar Filter - Left */}
        <Col lg={3} className="mb-4">
          <div className="bg-white p-4 rounded-4 shadow-sm border-0 sticky-top" style={{ top: '90px' }}>
            <h5 className="fw-bold mb-4">Lọc danh sách</h5>
            
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Khu vực</Form.Label>
              <div className="d-flex flex-column gap-2">
                {districts.map(d => (
                  <Form.Check 
                    key={d}
                    type="radio"
                    id={`district-${d}`}
                    label={d === 'All' ? 'Tất cả khu vực' : d}
                    name="districtFilter"
                    checked={filterDistrict === d}
                    onChange={() => setFilterDistrict(d)}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Tiện ích</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {allAmenities.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    className={`modern-badge border-0 ${filterAmenities.includes(amenity) ? 'bg-primary text-white' : ''}`}
                    style={filterAmenities.includes(amenity) ? { backgroundColor: 'var(--primary-btn)' } : {}}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    {getIcon(amenity)} {amenity}
                  </button>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Mức giá</Form.Label>
              <Form.Select 
                className="rounded-3 shadow-none border-1"
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
              >
                <option value="All">Tất cả mức giá</option>
                <option value="Under50k">Dưới 50.000đ</option>
                <option value="50k-100k">Từ 50.000đ - 100.000đ</option>
                <option value="Over100k">Trên 100.000đ</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-semibold small text-uppercase">Quán Yêu Thích</Form.Label>
              <Form.Check 
                type="switch"
                className="custom-switch-md"
                id="favorite-switch"
                label={showOnlyFavorites ? "Đang hiển thị quán yêu thích" : "Hiển thị quán yêu thích"}
                checked={showOnlyFavorites}
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text-muted fw-semibold small text-uppercase">Sắp xếp theo</Form.Label>
              <Form.Select 
                className="rounded-pill shadow-none border-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="ratingDesc">Đánh giá Cao - Thấp</option>
                <option value="ratingAsc">Đánh giá Thấp - Cao</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Col>

        {/* Gallery - Right */}
        <Col lg={9}>
          {loading && <div>Đang tải dữ liệu...</div>}
          {error && <div className="text-danger">{error}</div>}
          {!loading && !error && processedCafes.length === 0 && (
            <div className="text-center text-muted py-5">
              <Coffee size={48} className="mb-3 opacity-50" />
              <h5>Không tìm thấy quán cà phê nào phù hợp.</h5>
            </div>
          )}
          
          <Row className="g-4">
            {processedCafes.map((cafe, index) => (
              <Col md={6} xl={4} key={cafe.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/cafe/${cafe.id}`} className="text-decoration-none text-dark">
                    <div className="modern-card h-100 d-flex flex-column bg-white">
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
                              color={favorites.includes(cafe.id) ? "#EF4444" : "#ffffff"} 
                              fill={favorites.includes(cafe.id) ? "#EF4444" : "rgba(0,0,0,0.3)"} 
                            />
                          </motion.div>
                        </div>

                        <div 
                          className="position-absolute bg-white px-2 py-1 rounded-pill d-flex align-items-center gap-1 shadow-sm"
                          style={{ top: '12px', right: '12px', fontSize: '14px', fontWeight: '600' }}
                        >
                          <Star size={16} color="#F59E0B" fill="#F59E0B" />
                          {cafe.rating}
                        </div>
                      </div>
                      
                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <h5 className="fw-bold mb-2 text-truncate" title={cafe.name}>{cafe.name}</h5>
                        <p className="text-muted small d-flex align-items-center gap-1 mb-3 text-truncate">
                          <MapPin size={14} />
                          {cafe.address}
                        </p>
                        
                        <div className="d-flex flex-wrap gap-2 mt-auto">
                          {cafe.amenities.slice(0, 3).map(amenity => (
                            <span key={amenity} className="modern-badge">
                              {getIcon(amenity)} {amenity}
                            </span>
                          ))}
                          {cafe.amenities.length > 3 && (
                            <span className="modern-badge bg-light">+{cafe.amenities.length - 3}</span>
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

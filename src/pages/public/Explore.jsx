import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Zap, VolumeX, Wind, Coffee, TreePine, Car } from 'lucide-react';
import { useCafeFilter } from '../../hooks/useCafeFilter';
import { cafeService } from '../../services/cafeService';
import { locationService } from '../../services/locationService';
import CafeList from '../../components/domain/user/explore/CafeList';
import Filter from '../../components/domain/user/explore/Filter';

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
          cafeService.getAllWithRating(),
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
        <Filter
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          locations={locations}
          amenitiesFilter={amenitiesFilter}
          toggleAmenity={toggleAmenity}
          getIcon={getIcon}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Gallery - Right */}
        <CafeList
          favoritesFilter={favoritesFilter}
          setFavoritesFilter={setFavoritesFilter}
          isLoading={isLoading}
          errorMsg={errorMsg}
          filteredCafes={filteredCafes}
          toggleFavorite={toggleFavorite}
          favoritesList={favoritesList}
          locations={locations}
          getIcon={getIcon}
        />
      </Row>
    </Container>
  );
};

export default Explore;

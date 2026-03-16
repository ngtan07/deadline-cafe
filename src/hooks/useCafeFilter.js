import { useState, useMemo, useEffect } from 'react';
import { favoriteService } from '../services/favoriteService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useCafeFilter = (cafesList = [], locationsList = []) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('All');
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  
  const [favoriteRecords, setFavoriteRecords] = useState([]); // Lưu các record object (id record + cafeId + userId) từ DB
  const [favoritesList, setFavoritesList] = useState([]); // Mảng cafeId để thuận tiện UI rendering
  const [sortBy, setSortBy] = useState('ratingDesc');

  useEffect(() => {
    if (user) {
      favoriteService.getByUser(user.id).then(data => {
        setFavoriteRecords(data);
        setFavoritesList(data.map(item => item.cafeId));
      }).catch(err => console.error("Error loading favorite list from backend", err));
    } else {
      setFavoriteRecords([]);
      setFavoritesList([]);
    }
  }, [user]);

  const toggleFavorite = async (e, cafeId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!user) {
      navigate('/login');
      return;
    }

    const isFavorited = favoritesList.includes(cafeId);

    try {
      if (isFavorited) {
        const record = favoriteRecords.find(f => f.cafeId === cafeId);
        if (record) {
          await favoriteService.remove(record.id);
          setFavoriteRecords(prev => prev.filter(f => f.id !== record.id));
          setFavoritesList(prev => prev.filter(id => id !== cafeId));
        }
      } else {
        const newRecord = await favoriteService.add(user.id, cafeId);
        setFavoriteRecords(prev => [...prev, newRecord]);
        setFavoritesList(prev => [...prev, cafeId]);
      }
    } catch (err) {
      console.error("Lỗi cập nhật backend", err);
      alert("Đã có lỗi xảy ra! Không thể lưu yêu thích.");
    }
  };

  const toggleAmenity = (amenity) => {
    setAmenitiesFilter(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const filteredCafes = useMemo(() => {
    if (!cafesList) return [];

    let result = [...cafesList];

    // Search query
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      result = result.filter(c => {
        const locName = locationsList?.find(l => l.id === c.locationId)?.name || '';
        return c.name.toLowerCase().includes(s) ||
               locName.toLowerCase().includes(s) ||
               c.address.toLowerCase().includes(s);
      });
    }

    // Location
    if (locationFilter && locationFilter !== 'All') {
      result = result.filter(cafe => String(cafe.locationId) === String(locationFilter));
    }

    // Rating
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      result = result.filter(cafe => cafe.rating >= minRating);
    }

    // Amenities
    if (amenitiesFilter && amenitiesFilter.length > 0) {
      result = result.filter(cafe =>
        amenitiesFilter.every(amenity => cafe.amenities && cafe.amenities.includes(amenity))
      );
    }

    // Price
    if (priceFilter && priceFilter !== 'All') {
      result = result.filter(cafe => {
        if (!cafe.priceRange) return false;
        const avgPrice = (cafe.priceRange.min + cafe.priceRange.max) / 2;
        if (priceFilter === 'Under50k') return avgPrice < 50000;
        if (priceFilter === '50k-100k') return avgPrice >= 50000 && avgPrice <= 100000;
        if (priceFilter === 'Over100k') return avgPrice > 100000;
        return true;
      });
    }

    // Favorites filter
    if (favoritesFilter) {
      result = result.filter(c => favoritesList.includes(c.id));
    }

    // Sort
    if (sortBy === 'ratingDesc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'ratingAsc') {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [cafesList, locationsList, searchQuery, locationFilter, ratingFilter, priceFilter, amenitiesFilter, favoritesFilter, favoritesList, sortBy]);

  return {
    searchQuery, setSearchQuery,
    locationFilter, setLocationFilter,
    ratingFilter, setRatingFilter,
    priceFilter, setPriceFilter,
    amenitiesFilter, setAmenitiesFilter,
    favoritesFilter, setFavoritesFilter,
    favoritesList, setFavoritesList,
    sortBy, setSortBy,
    toggleFavorite,
    toggleAmenity,
    filteredCafes
  };
};

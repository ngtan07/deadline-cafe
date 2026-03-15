import { useState, useMemo } from 'react';

export const useCafeFilter = (cafesList) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const filteredCafes = useMemo(() => {
    if (!cafesList) return [];
    
    let result = cafesList;

    // Search by name
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(cafe => cafe.name.toLowerCase().includes(query));
    }

    // Filter by location
    if (locationFilter) {
      result = result.filter(cafe => String(cafe.locationId) === String(locationFilter));
    }

    // Filter by rating (assuming it means "rating >= X")
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      result = result.filter(cafe => cafe.rating >= minRating);
    }

    return result;
  }, [cafesList, searchQuery, locationFilter, ratingFilter]);

  return {
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    ratingFilter,
    setRatingFilter,
    filteredCafes
  };
};

import { useState, useEffect } from 'react';
import { cafeService } from '../../services/cafeService';
import { reviewService } from '../../services/reviewService';
import { userService } from '../../services/userService';
import { favoriteService } from '../../services/favoriteService';
import { locationService } from '../../services/locationService';

export const useAdminDashboardData = () => {
  const [cafesList, setCafesList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [cafes, reviews, users, favorites, locations] = await Promise.all([
          cafeService.getAll(),
          reviewService.getAll(),
          userService.getAll(),
          favoriteService.getAll(),
          locationService.getAll(),
        ]);
        setCafesList(cafes);
        setReviewsList(reviews);
        setUsersList(users);
        setFavoritesList(favorites);
        setLocationsList(locations);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const totalCafes = cafesList.length;
  const totalReviews = reviewsList.length;
  const totalUsers = usersList.length;
  const avgRating = totalCafes > 0
    ? (cafesList.reduce((sum, cafe) => sum + parseFloat(cafe.rating || 0), 0) / totalCafes).toFixed(1)
    : 0;

  const topCafesByRating = [...cafesList]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 5);

  const ratingChartData = topCafesByRating.map(cafe => ({
    name: cafe.name.length > 15 ? cafe.name.substring(0, 15) + '...' : cafe.name,
    fullName: cafe.name,
    rating: parseFloat(cafe.rating),
  }));

  const favCountMap = favoritesList.reduce((acc, fav) => {
    acc[fav.cafeId] = (acc[fav.cafeId] || 0) + 1;
    return acc;
  }, {});

  const favChartData = [...cafesList]
    .map(cafe => ({ ...cafe, favCount: favCountMap[cafe.id] || 0 }))
    .sort((a, b) => b.favCount - a.favCount)
    .slice(0, 5)
    .map(cafe => ({
      name: cafe.name.length > 15 ? cafe.name.substring(0, 15) + '...' : cafe.name,
      fullName: cafe.name,
      favorites: cafe.favCount,
    }));

  const locationChartData = locationsList.map(loc => ({
    name: loc.name,
    count: cafesList.filter(c => c.locationId === loc.id).length,
  }));


  const recentReviews = [...reviewsList]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(review => ({
      ...review,
      cafeName: cafesList.find(c => c.id === review.cafeId)?.name || 'Unknown',
      userName: usersList.find(u => u.id === review.userId)?.name || 'Anonymous',
      userAvatar: usersList.find(u => u.id === review.userId)?.avatar || '',
    }));

  return {
    cafesList, setCafesList,
    reviewsList, setReviewsList,
    usersList, setUsersList,
    locationsList, setLocationsList,
    totalCafes, totalReviews, totalUsers, avgRating,
    ratingChartData, favChartData, locationChartData,
    recentReviews,
    loading,
  };
};

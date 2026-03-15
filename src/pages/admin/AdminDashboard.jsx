import { useAdminDashboardData } from '../../hooks/admin/useAdminDashboardData';
import { Users, Coffee, Star, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Row, Col, Spinner } from 'react-bootstrap';

import TopCafeReview from '../../components/domain/admin/dashboard/topCafeReview';
import DistributionArea from '../../components/domain/admin/dashboard/DistributionArea';
import FavoritePlace from '../../components/domain/admin/dashboard/FavoritePlace';
import ListCafe from '../../components/domain/admin/dashboard/ListCafe';
import StatCard from '../../components/common/admin/StatCard';
import RecentFeedback from '../../components/domain/admin/dashboard/RecentFeedback';

const BROWN = '#8B3A2A';
const PALETTE = ['#8B3A2A', '#A85540', '#C47860', '#DBA080', '#EEC8A8', '#F5E0CC'];

const AdminDashboard = () => {
  const {
    totalCafes, totalUsers, totalReviews, avgRating,
    ratingChartData, favChartData, locationChartData,
    recentReviews,
    loading,
  } = useAdminDashboardData();


  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100 w-100" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: BROWN, width: 48, height: 48 }} />
          <p className="mt-3 text-muted fw-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { icon: Coffee, label: 'Total number of cafes', value: totalCafes, color: BROWN, delay: 0.05 },
    { icon: Users, label: 'Total Number of Users', value: totalUsers, color: '#3BAF6E', delay: 0.1 },
    { icon: MessageSquare, label: 'Total Number of Reviews', value: totalReviews, color: '#5B8DD9', delay: 0.15 },
    { icon: Star, label: 'Average rating', value: avgRating, color: '#F5A623', delay: 0.2 },
  ];

  return (
    <div className="p-4 p-lg-5 overflow-auto" style={{ minHeight: '100vh' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="d-flex justify-content-between align-items-start mb-5">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: 'var(--primary-btn)', fontSize: '1.75rem' }}>Dashboard</h1>
            <p className="text-muted mb-0">Welcome back! Here's an update on how Dehofee is doing today.</p>
          </div>
          <div className="text-end d-none d-md-block">
            <span className="badge rounded-pill fw-medium px-3 py-2" style={{ backgroundColor: `${BROWN}15`, color: BROWN }}>
              Last updated: {new Date().toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <Row className="g-4 mb-5">
        {statCards.map((s, i) => (
          <Col xs={12} sm={6} xl={3} key={i}>
            <StatCard {...s} />
          </Col>
        ))}
      </Row>

      {/* Charts Row 1: Bar + Pie */}
      <Row className="g-4 mb-4">
        <TopCafeReview
          BROWN={BROWN}
          ratingChartData={ratingChartData} />

        <DistributionArea
          BROWN={BROWN}
          PALETTE={PALETTE}
          locationChartData={locationChartData} />

      </Row>

      {/* Charts Row 2: Favorites + Cafe List */}
      <Row className="g-4 mb-4">

        <FavoritePlace favChartData={favChartData} />

        <ListCafe BROWN={BROWN}
          PALETTE={PALETTE}
          ratingChartData={ratingChartData} />
      </Row>

      {/* Recent Reviews */}
      <RecentFeedback
        recentReviews={recentReviews}
        BROWN={BROWN}
      />

      <style>{`
        .modern-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .modern-card:hover { transform: translateY(-4px); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

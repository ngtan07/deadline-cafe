
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Col, Card } from 'react-bootstrap';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import CustomTooltip from '../dashboard/CustomTooltip'


const TopCafeReview = ({ BROWN, ratingChartData }) => {

    return (
        <Col xs={12} lg={7}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
                <Card className="modern-card border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <TrendingUp size={20} color={BROWN} />
                            <h5 className="fw-bold mb-0" style={{ color: '#3C2A21' }}>Top Cafes by Reviews</h5>
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={ratingChartData} margin={{ top: 0, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8A7365' }} />
                                <YAxis domain={[3.5, 5]} tick={{ fontSize: 11, fill: '#8A7365' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="rating" name="Feedback" radius={[8, 8, 0, 0]} fill={BROWN} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </motion.div>
        </Col>
    )
}

export default TopCafeReview

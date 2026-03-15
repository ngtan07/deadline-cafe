import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Col, Card } from 'react-bootstrap';
import CustomTooltip from './CustomTooltip'

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const FavoritePlace = ({ favChartData }) => {
    return (
        <Col xs={12} lg={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
                <Card className="modern-card border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <Heart size={20} color="#E05C5C" />
                            <h5 className="fw-bold mb-0" style={{ color: '#3C2A21' }}>Favorite place</h5>
                        </div>
                        {favChartData.every(d => d.favorites === 0) ? (
                            <div className="text-center py-5 text-muted">
                                <Heart size={40} className="mb-3 opacity-25" />
                                <p>No data.</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={favChartData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE6" horizontal={false} />
                                    <XAxis type="number" tick={{ fontSize: 11, fill: '#8A7365' }} allowDecimals={false} />
                                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11, fill: '#5C4033' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="favorites" name="favorites" radius={[0, 8, 8, 0]} fill="#E05C5C" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </Card.Body>
                </Card>
            </motion.div>
        </Col>
    )
}

export default FavoritePlace

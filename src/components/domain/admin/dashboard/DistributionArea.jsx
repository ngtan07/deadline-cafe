import { Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Col, Card } from 'react-bootstrap';
import { PieChart, Tooltip, ResponsiveContainer, Pie, Cell, Legend } from 'recharts';

const DistributionArea = ({ PALETTE, BROWN, locationChartData }) => {
    return (
        <Col xs={12} lg={5}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                <Card className="modern-card border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <Coffee size={20} color={BROWN} />
                            <h5 className="fw-bold mb-0" style={{ color: '#3C2A21' }}>Cafe Distribution by Area</h5>
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={locationChartData}
                                    cx="50%" cy="50%"
                                    innerRadius={55} outerRadius={95}
                                    paddingAngle={4}
                                    dataKey="count"
                                    nameKey="name"
                                >
                                    {locationChartData.map((_, index) => (
                                        <Cell key={index} fill={PALETTE[index % PALETTE.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v, n) => [v + ' place', n]} />
                                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '0.8rem' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </motion.div>
        </Col>
    )
}

export default DistributionArea

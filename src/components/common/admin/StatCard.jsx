import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="h-100"
    >
        <Card className="modern-card border-0 shadow-sm rounded-4 h-100 p-1">
            <Card.Body className="d-flex align-items-center gap-3 py-2">
                <div
                    className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 56, height: 56, backgroundColor: `${color}15` }}
                >
                    <Icon size={26} color={color} strokeWidth={2} />
                </div>
                <div>
                    <p className="text-muted mb-0 small fw-semibold text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>{label}</p>
                    <h2 className="fw-bold mb-0 mt-1" style={{ fontSize: '2rem', color: '#3C2A21' }}>{value}</h2>
                </div>
            </Card.Body>
        </Card>
    </motion.div>
);

export default StatCard

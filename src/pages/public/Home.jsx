import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: 'calc(100vh - 76px)',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF'
      }}
    >
      <div className="container text-center">
        <motion.h1
          className="display-3 fw-bold mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Dehofee - Find The Perfect Space <br />
          <span style={{ color: 'var(--accent-color)' }}>For Your Deadlines</span>
        </motion.h1>

        <motion.p
          className="lead mb-5 mx-auto"
          style={{ maxWidth: '600px', opacity: 0.9 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Over 500+ satellite cafes perfect for students to work and study with strong wifi and power plugs everywhere.
        </motion.p>

        <motion.form
          className="glass-effect mx-auto p-2 d-flex align-items-center shadow-lg"
          style={{ maxWidth: '600px', borderRadius: '100px' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onSubmit={handleSearch}
        >
          <div className="flex-grow-1 position-relative">
            <Search
              className="position-absolute"
              size={20}
              color="#FFF"
              style={{ top: '50%', transform: 'translateY(-50%)', left: '20px' }}
            />
            <input
              type="text"
              className="form-control bg-transparent border-0 text-white px-5 py-3 shadow-none focus-ring-0"
              placeholder="Enter cafe name, area (ex: Thạch Hòa, Tân Xã)..."
              style={{ '::placeholder': { color: 'rgba(255,255,255,0.7)' } }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary-modern me-2 py-3 px-4">
            Explore Now
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Home;

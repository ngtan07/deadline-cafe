import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CafeDetail from './pages/CafeDetail';
import CafeReviews from './pages/CafeReviews';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="cafe/:id" element={<CafeDetail />} />
          <Route path="cafe/:id/reviews" element={<CafeReviews />} />
        </Route>
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Route - Separate Layout typically */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

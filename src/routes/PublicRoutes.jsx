import { Route, Routes } from "react-router-dom";

import Layout from '../components/layout/user/Layout'
import Home from '../pages/public/Home'
import Explore from '../pages/public/Explore'
import CafeDetail from "../pages/public/CafeDetail";
import CafeReviews from '../pages/user/CafeReviews';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="cafe/:id" element={<CafeDetail />} />
                <Route path="cafe/:id/reviews" element={<CafeReviews />} />
            </Route>

        </Routes>
    );
};

export default PublicRoutes;
import { Route, Routes } from "react-router-dom";

import Layout from '../components/layout/user/Layout';
import CafeReviews from '../pages/user/CafeReviews'
import CafeDetail from '../pages/user/CafeDetail'

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="cafe/:id/reviews" element={<CafeReviews />} />
                <Route path="cafe/:id" element={<CafeDetail />} />
            </Route>

        </Routes>
    );
};

export default UserRoutes;
import { Route, Routes } from "react-router-dom";

import Layout from '../components/layout/user/Layout';
import CafeReviews from '../pages/CafeReviews'

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="cafe/:id/reviews" element={<CafeReviews />} />
            </Route>

        </Routes>
    );
};

export default UserRoutes;
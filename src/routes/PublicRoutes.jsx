import { Route, Routes } from "react-router-dom";

import Layout from '../components/layout/user/Layout'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import CafeDetail from '../pages/CafeDetail'

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="cafe/:id" element={<CafeDetail />} />
            </Route>

        </Routes>
    );
};

export default PublicRoutes;
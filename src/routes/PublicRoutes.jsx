import { Route, Routes } from "react-router-dom";

import Layout from '../components/layout/user/Layout'
import Home from '../pages/public/Home'
import Explore from '../pages/public/Explore'
const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
            </Route>

        </Routes>
    );
};

export default PublicRoutes;
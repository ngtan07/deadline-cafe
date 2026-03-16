import { Route, Routes } from "react-router-dom";

import Layout from '../components/layout/user/Layout';

// UserRoutes: các trang yêu cầu đăng nhập
// /cafe/:id/reviews đã được chuyển sang PublicRoutes (ai cũng xem được)
const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* Thêm các route protected khác tại đây */}
            </Route>
        </Routes>
    );
};

export default UserRoutes;
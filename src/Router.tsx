import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DefaultLayout } from './components/layout/DefaultLayout';
import AuthPage from './pages/AuthPage';
import DashBoardPage from './pages/DashBoardPage';
import MemberListPage from './pages/MemberListPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="main" element={<DefaultLayout />}>
        <Route path="dashboard" element={<DashBoardPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="member" element={<MemberListPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

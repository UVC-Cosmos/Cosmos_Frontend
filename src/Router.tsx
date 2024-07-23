import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import AuthPage from './pages/AuthPage';
import MemberListPage from './pages/MemberListPage';
import EditUserPage from './pages/EditUserPage';
import DashBoardPage from './pages/DashBoardPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<MemberListPage />} />
      <Route path="/edit" element={<EditUserPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="member" element={<MemberListPage />} />
      </Route>
      <Route path="/dashboard" element={<DashBoardPage />} />
    </Routes>
  );
};

export default Router;

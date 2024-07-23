import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import AuthPage from './pages/AuthPage';
import MemberListPage from './pages/MemberListPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="admin" element={<AdminLayout />}>
        <Route path="member" element={<MemberListPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

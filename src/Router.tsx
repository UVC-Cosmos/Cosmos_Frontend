import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DefaultLayout } from './components/layout/DefaultLayout';
import AuthPage from './pages/AuthPage';
import DashBoardPage from './pages/DashBoardPage';
import EditUserPage from './pages/EditUserPage';
import MemberListPage from './pages/MemberListPage';
import { PermissionPage } from './pages/PermissionPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="main" element={<DefaultLayout />}>
        <Route path="dashboard" element={<DashBoardPage />} />
        <Route path="edit" element={<EditUserPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="member" element={<MemberListPage />} />
      </Route>
      <Route path="factory" element={<AdminLayout />}>
        <Route path="member" element={<PermissionPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { ManagerLayout } from './components/layout/ManagerLayout';
import { IUser } from './interface/authInterface';
import AuthPage from './pages/AuthPage';
import DashBoardPage from './pages/DashBoardPage';
import EditUserPage from './pages/EditUserPage';
import { LogPage } from './pages/LogPage';
import MemberListPage from './pages/MemberListPage';
import { PermissionPage } from './pages/PermissionPage';

const Router = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('isLogin') === 'true';
  const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.role;

  useEffect(() => {
    if (isLogin) {
      switch (userType) {
        case 'User':
          navigate('/main/dashboard');
          break;
        case 'Admin':
          navigate('/admin/member');
          break;
        case 'A-factoryAdmin':
        case 'B-factoryAdmin':
        case 'C-factoryAdmin':
          navigate('/factory/member');
          break;
        default:
          break;
      }
    }
  }, [isLogin, navigate, userType]);
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="main" element={<DefaultLayout />}>
        <Route path="dashboard" element={<DashBoardPage />} />
        <Route path="edit" element={<EditUserPage />} />
        <Route path="log" element={<LogPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="member" element={<MemberListPage />} />
      </Route>
      <Route path="factory" element={<ManagerLayout />}>
        <Route path="member" element={<PermissionPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DefaultLayout, IUser2 } from './components/layout/DefaultLayout';
import { ManagerLayout } from './components/layout/ManagerLayout';
import AuthPage from './pages/AuthPage';
import DashBoardPage from './pages/DashBoardPage';
import EditUserPage from './pages/EditUserPage';
import { ErrorPage } from './pages/ErrorPage';
import { LogPage } from './pages/LogPage';
import MemberListPage from './pages/MemberListPage';
import { PermissionPage } from './pages/PermissionPage';
import WriteNotifyPage from './pages/WriteNotifyPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/error" element={<ErrorPage />} />
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
        <Route path="write" element={<WriteNotifyPage />} />
      </Route>
    </Routes>
  );
};

export default Router;

import { Route, Routes } from 'react-router';
import AuthPage from './pages/AuthPage';
import MemberListPage from './pages/MemberListPage';
import DashBoardPage from './pages/DashBoardPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<MemberListPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
    </Routes>
  );
};

export default Router;

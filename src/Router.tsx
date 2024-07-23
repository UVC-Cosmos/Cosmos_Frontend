import { Route, Routes } from 'react-router';
import AuthPage from './pages/AuthPage';
import MemberListPage from './pages/MemberListPage';
import EditUserPage from './pages/EditUserPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<MemberListPage />} />
      <Route path="/edit" element={<EditUserPage />} />
    </Routes>
  );
};

export default Router;

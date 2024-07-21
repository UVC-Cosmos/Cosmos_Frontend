import { Route, Routes } from 'react-router';
import AuthPage from './pages/AuthPage';
import MemberListPage from './pages/MemberListPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<MemberListPage />} />
    </Routes>
  );
};

export default Router;

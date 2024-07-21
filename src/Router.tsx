import { Route, Routes } from 'react-router';
import AuthPage from './pages/AuthPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};

export default Router;

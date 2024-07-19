import { Route, Routes } from 'react-router';
import App from './pages/AuthP';
import AuthPage from './pages/AuthPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<App />} />
    </Routes>
  );
};

export default Router;

import { Navigate } from 'react-router';
import { IUser } from '../../interface/authInterface';

interface IAuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute = ({ children }: IAuthRouteProps) => {
  const isLogin = localStorage.getItem('isLogin') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
  const role = user.role;

  if (role === 'Admin' || role === 'FactoryAdmin') {
    // 허용되지 않은 role인 경우 메인 페이지로 리다이렉트
    alert('접근 권한이 없습니다.');
    return <Navigate to="/admin/member" replace />;
  }

  return isLogin ? children : <Navigate to="/" />;
};

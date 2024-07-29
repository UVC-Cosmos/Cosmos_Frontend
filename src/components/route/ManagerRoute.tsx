import { IUser } from '@/interface/authInterface';
import { Navigate } from 'react-router';

interface IManagerRouteProps {
  children: React.ReactNode;
}

export const ManagerRoute = ({ children }: IManagerRouteProps) => {
  const isLogin = localStorage.getItem('isLogin') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
  const role = user.role;

  if (!isLogin) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  if (role === 'User') {
    alert('접근 권한이 없습니다.');
    return <Navigate to="/main/dashboard" replace />;
  }

  if (role === 'Admin') {
    alert('접근 권한이 없습니다.');
    return <Navigate to="/admin/member" replace />;
  }

  // return role === 'A-factoryAdmin' || role === 'B-factoryAdmin' || role === 'C-factoryAdmin' ? (
  //   children
  // ) : (
  //   <Navigate to="/" />
  // );
  return children;
};

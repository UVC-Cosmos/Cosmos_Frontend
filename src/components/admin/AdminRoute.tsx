import { useAtomValue } from 'jotai';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { isLoginAtom, userAtom } from '../../atom/auth/authAtom';
import { IUser } from '../../interface/authInterface';
import MemberListPage from '../../pages/MemberListPage';

interface IAdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: IAdminRouteProps) => {
  const isLogin = localStorage.getItem('isLogin') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
  const role = user.role;

  if (!isLogin) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  if (role !== 'Admin') {
    // 허용되지 않은 role인 경우 메인 페이지로 리다이렉트
    alert('접근 권한이 없습니다.');
    return <Navigate to="/main" replace />;
  }

  return role === 'Admin' ? children : <Navigate to="/" />;
};

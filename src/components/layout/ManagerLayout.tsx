import { apiInstance } from '@/api/api';
import Logo from '@/assets/cosmos.svg?react';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { IUser } from '@/interface/authInterface';
import { Outlet, useNavigate } from 'react-router';
import { ManagerRoute } from '../route/ManagerRoute';

export const ManagerLayout = (): JSX.Element => {
  const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentTime = useCurrentTime();
  const navigate = useNavigate();
  function clearCosmosSessionCookie() {
    document.cookie = 'cosmosSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  const handleLogout = async () => {
    try {
      await apiInstance.post('/auth/logout').then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('isLogin');
          localStorage.removeItem('user');
          clearCosmosSessionCookie();
          alert('로그아웃 되었습니다.');
          navigate('/');
        } else {
          alert('로그아웃에 실패했습니다.');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="layout">
        <header className="h-20 bg-mainColor flex items-center justify-between">
          <div className="ml-4">
            <Logo />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="bg-mainLightColor rounded-lg px-4">
              <h2 className="text-white text-xl">{user.userName} 님 환영합니다!</h2>
            </div>
            <div className="text-white text-xl w-[14rem]">
              <h2>{currentTime}</h2>
            </div>
            <div onClick={handleLogout} className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3rem"
                height="3rem"
                viewBox="0 0 24 24"
                className="hover:bg-mainColorH"
              >
                <path
                  fill="#635985"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                ></path>
              </svg>
            </div>
          </div>
        </header>
      </div>
      <div>
        <ManagerRoute>
          <Outlet />
        </ManagerRoute>
      </div>
    </>
  );
};

import { apiInstance } from '@/api/api';
import Logo from '@/assets/cosmos.svg?react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { AuthRoute } from '../auth/AuthRotue';

export const DefaultLayout = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(formattedTime);
    };

    updateTime(); // 컴포넌트가 마운트될 때 시간을 설정합니다.
    const intervalId = setInterval(updateTime, 1000); // 1초마다 시간을 업데이트합니다.

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
  }, []);

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
    <div>
      <header className="h-20 bg-mainColor flex items-center justify-between">
        <div className="ml-4">
          <Logo />
        </div>
        <div className="flex flex-row gap-4">
          <div className="bg-mainLightColor rounded-lg px-4">
            <h2 className="text-white text-xl">OOO님 환영합니다!</h2>
          </div>
          <div className="text-white text-xl w-[14rem]">
            <h2>{currentTime}</h2>
          </div>
        </div>
      </header>

      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <div className="flex flex-row h-full">
          <div
            id="menu"
            className="bg-mainColor w-20 h-full me-3 flex flex-col justify-between items-center p-3 shadow-xl-center"
          >
            <div id="position-top" className="flex flex-col gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 24 24"
                  className="hover:bg-mainColorH"
                >
                  <path
                    fill="#635985"
                    d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
                  ></path>
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 20 20"
                  className="hover:bg-mainColorH"
                >
                  <g fill="#635985">
                    <path d="m3.196 12.87l-.825.483a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .758 0l7.25-4.25a.75.75 0 0 0 0-1.294l-.825-.484l-5.666 3.322a2.25 2.25 0 0 1-2.276 0z"></path>
                    <path d="m3.196 8.87l-.825.483a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .758 0l7.25-4.25a.75.75 0 0 0 0-1.294l-.825-.484l-5.666 3.322a2.25 2.25 0 0 1-2.276 0z"></path>
                    <path d="M10.38 1.103a.75.75 0 0 0-.76 0l-7.25 4.25a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .76 0l7.25-4.25a.75.75 0 0 0 0-1.294z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div id="position-end" className="flex flex-col gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 24 24"
                  className="hover:bg-mainColorH"
                >
                  <path
                    fill="#635985"
                    fillRule="evenodd"
                    d="M18.008 2.987C19.34 2.225 21 3.187 21 4.723v12.554c0 1.535-1.659 2.498-2.992 1.736L14 16.723V5.277zM12 6H7a5 5 0 0 0-1 9.9v3.6a2.5 2.5 0 0 0 5 0V16h1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div id="알림" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 16 16"
                  className="hover:bg-mainColorH"
                >
                  <path
                    fill="#635985"
                    d="M8 2a4.5 4.5 0 0 0-4.5 4.5v2.401l-.964 2.414A.5.5 0 0 0 3 12h10a.5.5 0 0 0 .464-.685L12.5 8.9V6.5A4.5 4.5 0 0 0 8 2m0 12.5A2 2 0 0 1 6.063 13h3.874A2 2 0 0 1 8 14.5"
                  ></path>
                </svg>
                <div className="rounded-full w-5 h-5 bg-mainColorH absolute top-1 right-1 flex justify-center items-center">
                  <p className="text-white text-sm">0</p>
                </div>
              </div>
              <div onClick={handleLogout}>
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
          </div>
          <div id="content" className="flex-1 bg-white mt-3 overflow-auto">
            <AuthRoute>
              <Outlet />
            </AuthRoute>
          </div>
          {/* 변경된 부분: flex-1로 공간을 차지하고 overflow-auto 추가 */}
        </div>
      </div>
    </div>
  );
};

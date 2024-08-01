import { apiInstance } from '@/api/api';
import Logo from '@/assets/cosmos.svg?react';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { IUser } from '@/interface/authInterface';
import { Outlet, useNavigate } from 'react-router';
import { AuthRoute } from '../auth/AuthRotue';

import { useState, useEffect } from 'react';
import useNotificationSocket from '../../hooks/useNotificationSocket';
import NotificationModal from '../modal/NotificationModal';

interface IUser2 extends IUser {
  id: string;
}
export const DefaultLayout = (): JSX.Element => {
  const navigate = useNavigate();
  const user: IUser2 = JSON.parse(localStorage.getItem('user') || '{}');

  const currentTime = useCurrentTime();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const WebSocketServerUrl = import.meta.env.VITE_WEBSOCKET_SERVER_URL;
  const [socket, notifications] = useNotificationSocket(WebSocketServerUrl, user.id);

  const [userNotifications, setUserNotifications] = useState<
    Array<{ id: number; content: string; createdAt: string }>
  >([]);

  // 페이지가 처음 로드될 때 HTTP 요청을 통해 데이터를 가져오는 부분
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiInstance.get('/notification');
        if (response.status === 200) {
          console.log('🚀 ~ fetchNotifications ~ response.data:', response.data);
          setUserNotifications(response.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('notifications', (data: { id: number; content: string; createdAt: string }) => {
        setUserNotifications((prevNotifications) => [...prevNotifications, data]);
      });
    }

    return () => {
      if (socket) {
        socket.off('notifications');
      }
    };
  }, [socket]);

  function clearCosmosSessionCookie() {
    document.cookie = 'cosmosSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  const goToEditProfile = () => {
    navigate('/main/edit');
  };

  const goToDashboard = () => {
    navigate('/main/dashboard');
  };

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

  const handleDeleteNotification = async (id: number) => {
    try {
      const res = await apiInstance.delete(`/notification/${id}`);
      if (res.status === 200) {
        setUserNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } else {
        alert('알림 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('알림 삭제 중 오류 발생:', error);
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
            <h2 className="text-white text-xl">{user.userName} 님 환영합니다!</h2>
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
              <div onClick={goToDashboard}>
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
              <div id="edit" onClick={goToEditProfile}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 24 24"
                  className="hover:bg-mainColorH"
                >
                  <path
                    fill="#635985"
                    d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"
                  ></path>
                </svg>
              </div>
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
              <div id="알림" className="relative" onClick={() => setIsModalOpen(true)}>
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
                  <p className="text-white text-sm">{userNotifications.length}</p>
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
      {isModalOpen && (
        <NotificationModal
          notifications={userNotifications}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteNotification}
        />
      )}
    </div>
  );
};

import { apiInstance } from '@/api/api';
import Logo from '@/assets/cosmos.svg?react';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { IFactory, ILine, IUser } from '@/interface/authInterface';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AuthRoute } from '../route/AuthRotue';
import '../modal/ShowUserInfo.css';
import { useEffect, useState } from 'react';
import useNotificationSocket from '../../hooks/useNotificationSocket';
import ExistingPasswordChangeModal from '../modal/ExistingPasswordChange';
import NotificationModal from '../modal/NotificationModal';

interface IUser2 extends IUser {
  Factories: IFactory[];
  Lines: ILine[];
  rank: string;
}
export const DefaultLayout = (): JSX.Element => {
  const navigate = useNavigate();

  // const [isShowUserInfoModal, setIsShowUserInfoModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState<boolean>(false);
  const location = useLocation();
  const user: IUser2 = JSON.parse(localStorage.getItem('user') || '{}');
  const factories = user.Factories;
  const [selectedFactory, setSelectedFactory] = useState<number | null>(null); // 선택된 공장 상태

  const currentTime = useCurrentTime();
  const WebSocketServerUrl = import.meta.env.VITE_WEBSOCKET_SERVER_URL;
  const [socket, notifications] = useNotificationSocket(WebSocketServerUrl, user.id);
  const isActive = (path: string) => {
    return location.pathname === path;
  };
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNotifyModal = () => {
    setIsNotifyModalOpen(!isNotifyModalOpen);
  };

  // const goToEditProfile = () => {
  //   navigate('/main/edit');
  // };

  const goToDashboard = () => {
    navigate('/main/dashboard');
  };

  const goToLog = () => {
    navigate('/main/log');
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

  const handleFactoryClick = (factoryId: number) => {
    setSelectedFactory(factoryId); // 선택된 공장 상태 업데이트
    localStorage.setItem('selectedFactory', JSON.stringify(factoryId));
    window.location.reload();
  };

  useEffect(() => {
    const savedFactoryId = localStorage.getItem('selectedFactory');
    if (savedFactoryId) {
      setSelectedFactory(JSON.parse(savedFactoryId));
    }
  }, []);

  // 회원정보 조회 모달 열기/닫기 함수
  // const openUserInfoModal = () => setIsShowUserInfoModal(true);
  // const closeUserInfoModal = () => setIsShowUserInfoModal(false);

  return (
    <>
      <div>
        <header className="h-[7vh] bg-bgLayout flex justify-between">
          <div className="ml-4 mt-2 rounded-full overflow-hidden w-12 h-12 bg-white flex items-center justify-center shadow-lg border border-gray-200">
            <Logo className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-row gap-4 m-2 items-center">
            {factories.map((factory) => (
              <button
                key={factory.id}
                className={`rounded-lg px-4 ${selectedFactory === factory.id ? 'bg-[#008000] text-white font-extrabold' : 'bg-[#5a626e] text-white'}`}
                onClick={() => handleFactoryClick(factory.id)}
              >
                <h2 className="text-xl">{factory.name}</h2>
              </button>
            ))}
            <div className="bg-[#5a626e] rounded-lg px-4">
              <h2 className="text-white text-xl">
                <strong className="font-black">{user.userName}</strong> 님 환영합니다!
              </h2>
            </div>
            <div className="text-white text-xl w-[14rem]">
              <h2>{currentTime}</h2>
            </div>
          </div>
        </header>
        <div className="flex flex-col">
          <div className="flex flex-row h-[93vh]">
            <div
              id="menu"
              className="bg-bgLayout w-[5vw] flex flex-col justify-between items-center shadow-xl-center"
            >
              <div id="position-top" className="flex flex-col gap-4 pt-3">
                <div
                  onClick={goToDashboard}
                  // className={`tooltip ${isActive('/main/dashboard') ? 'border border-borderGray' : ''}`}
                  data-tip="대시보드"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill={isActive('/main/dashboard') ? '#ffffff' : '#5a626e'}
                      d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
                    ></path>
                  </svg>
                </div>
                <div
                  data-tip="생산기록"
                  onClick={goToLog}
                  // className={`tooltip ${isActive('/main/log') ? 'bg-white' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 20 20"
                  >
                    <g fill={isActive('/main/log') ? '#ffffff' : '#5a626e'}>
                      <path d="m3.196 12.87l-.825.483a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .758 0l7.25-4.25a.75.75 0 0 0 0-1.294l-.825-.484l-5.666 3.322a2.25 2.25 0 0 1-2.276 0z"></path>
                      <path d="m3.196 8.87l-.825.483a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .758 0l7.25-4.25a.75.75 0 0 0 0-1.294l-.825-.484l-5.666 3.322a2.25 2.25 0 0 1-2.276 0z"></path>
                      <path d="M10.38 1.103a.75.75 0 0 0-.76 0l-7.25 4.25a.75.75 0 0 0 0 1.294l7.25 4.25a.75.75 0 0 0 .76 0l7.25-4.25a.75.75 0 0 0 0-1.294z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div id="position-end" className="flex flex-col gap-4 mb-4">
                <div className="drawer tooltip" data-tip="내 정보">
                  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3rem"
                        height="3rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#5a626e"
                          d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"
                        ></path>
                      </svg>
                    </label>
                  </div>
                  <div className="drawer-side z-40">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                      <div className="overflow-x-auto">
                        <table className="table">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <th>이름(Name)</th>
                              <td className="from-neutral-950">{user.userName}</td>
                            </tr>
                            <tr>
                              <th>아이디(ID)</th>
                              <td>
                                <ul>{user.userId}</ul>
                              </td>
                            </tr>
                            <tr>
                              <th>비밀번호(PW)</th>
                              <td>
                                <ul>
                                  <button className="btn btn-sm" onClick={toggleModal}>
                                    비밀번호 변경
                                  </button>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <th>이메일(Email)</th>
                              <td>{user.email}</td>
                            </tr>
                            <tr>
                              <th>소속 공장(Factories)</th>
                              <td>
                                <ul>
                                  {user.Factories.map((factory, index) => (
                                    <li key={index}>{factory.name}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <th>직급(Rank)</th>
                              <td>
                                <ul>{user.rank}</ul>
                              </td>
                            </tr>
                            <tr>
                              <th>제어 권한(Line)</th>
                              <td>
                                <ul>
                                  {user.Lines.length > 0 ? (
                                    user.Lines.map((line, index) => (
                                      <li key={index}>{line.name}</li>
                                    ))
                                  ) : (
                                    <li>없음</li>
                                  )}
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="tooltip" data-tip="공지사항">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#5a626e"
                      fillRule="evenodd"
                      d="M18.008 2.987C19.34 2.225 21 3.187 21 4.723v12.554c0 1.535-1.659 2.498-2.992 1.736L14 16.723V5.277zM12 6H7a5 5 0 0 0-1 9.9v3.6a2.5 2.5 0 0 0 5 0V16h1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div
                  id="알림"
                  className="relative tooltip"
                  data-tip="알림"
                  onClick={toggleNotifyModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#5a626e"
                      d="M8 2a4.5 4.5 0 0 0-4.5 4.5v2.401l-.964 2.414A.5.5 0 0 0 3 12h10a.5.5 0 0 0 .464-.685L12.5 8.9V6.5A4.5 4.5 0 0 0 8 2m0 12.5A2 2 0 0 1 6.063 13h3.874A2 2 0 0 1 8 14.5"
                    ></path>
                  </svg>
                  <div className="rounded-full w-5 h-5 bg-mainColorH absolute top-1 right-1 flex justify-center items-center">
                    <p className="text-white text-sm">{userNotifications.length}</p>
                  </div>
                </div>
                <div onClick={handleLogout} className="tooltip" data-tip="로그아웃">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#5a626e"
                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div id="content" className="bg-mainColor overflow-auto w-[95vw]">
              <AuthRoute>
                <Outlet />
              </AuthRoute>
            </div>
          </div>
        </div>
        {isNotifyModalOpen && (
          <NotificationModal
            notifications={userNotifications}
            onClose={toggleNotifyModal}
            onDelete={handleDeleteNotification}
          />
        )}
      </div>
      {isModalOpen && <ExistingPasswordChangeModal onClose={toggleModal} title="비밀번호 변경" />}
    </>
  );
};

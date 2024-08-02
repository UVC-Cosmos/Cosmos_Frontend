import { apiInstance } from '@/api/api';
import Logo from '@/assets/cosmos.svg?react';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { IUser } from '@/interface/authInterface';
import { Outlet, useNavigate } from 'react-router';
import { ManagerRoute } from '../route/ManagerRoute';
import { useState } from 'react';
import AdminModal from '../modal/AdminModal';

export const ManagerLayout = (): JSX.Element => {
  const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentTime = useCurrentTime();
  const navigate = useNavigate();
  function clearCosmosSessionCookie() {
    document.cookie = 'cosmosSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
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
  const handleWrite = async () => {
    try {
      navigate('/factory/write');
    } catch (error) {
      console.error(error);
    }
  };
  const handleMember = async () => {
    try {
      navigate('/factory/member');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="layout">
      <header className="h-20 bg-mainColor flex items-center justify-between">
        <div className="ml-4 rounded-full overflow-hidden w-16 h-16 bg-white flex items-center justify-center">
          <Logo className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-[#5a626e] rounded-lg px-4">
            <h2 className="text-white text-xl">
              <strong className="font-black">{user.userName}</strong> 님 환영합니다!
            </h2>
          </div>
          <div className="text-white text-xl w-[14rem]">
            <h2>{currentTime}</h2>
          </div>
          <div className="dropdown dropdown-bottom dropdown-end mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-mainColor text-white border-mainColor"
            >
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-white"
            >
              <li>
                <div onClick={handleMember}>
                  <a>사용자 조회</a>
                </div>
              </li>
              <li>
                <div onClick={handleWrite}>
                  <a>공지작성</a>
                </div>
              </li>
              <li>
                <div onClick={handleModal}>
                  <a>비밀번호 변경</a>
                </div>
              </li>
              <li>
                <div onClick={handleLogout}>
                  <a>로그아웃</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div>
        <ManagerRoute>
          <Outlet />
        </ManagerRoute>
      </div>
      {isModalOpen && <AdminModal onClose={handleModal} title="비밀번호 변경" />}
    </div>
  );
};

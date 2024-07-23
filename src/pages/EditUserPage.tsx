import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import logoutIcon from '../assets/icons/logoutbox.png';
import notify from '../assets/icons/notification.png';
import megaphone from '../assets/icons/megaphone.png';
import chart from '../assets/icons/chart.png';
import history from '../assets/icons/history.png';

const EditUserInfo = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState<string>('');

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
  return (
    <>
      <div>
        <header className="h-20 bg-[#91B7FF] flex items-center justify-between shadow-xl">
          <div className="ml-4">
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover" />
          </div>
          <div className="flex flex-row">
            <h2 className=" text-white text-2xl me-6">OOO(OOO)님 환영합니다!</h2>
            <div className="text-white text-2xl me-6">
              <h2>{currentTime}</h2>
            </div>
          </div>
        </header>

        <div className="flex flex-col h-[calc(100vh-5rem)]">
          <div className="flex flex-row h-full">
            <div
              id="menu"
              className="bg-[#91B7FF] w-20 h-full me-3 flex flex-col justify-between items-center p-3 shadow-xl-center"
            >
              <div id="position-top">
                <span>
                  <img src={chart} alt="chart" className="w-10 h-10 hover:bg-[#84a7e7a4] mt-10" />
                </span>
                <span>
                  <img
                    src={history}
                    alt="history"
                    className="w-10 h-10 hover:bg-[#84a7e7a4] mt-8"
                  />
                </span>
              </div>
              <div id="position-end">
                <span>
                  <img src={megaphone} alt="megaphone" className="w-10 h-10 hover:bg-[#84a7e7a4]" />
                </span>
                <span>
                  <img src={notify} alt="notify" className="w-10 h-10 hover:bg-[#84a7e7a4] mt-3" />
                </span>
                <span>
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    className="w-10 h-10 hover:bg-[#84a7e7a4] mt-3"
                  />
                </span>
              </div>
            </div>
            <div id="content" className="flex-1 bg-white mt-3 overflow-auto"></div>{' '}
            {/* 변경된 부분: flex-1로 공간을 차지하고 overflow-auto 추가 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserInfo;

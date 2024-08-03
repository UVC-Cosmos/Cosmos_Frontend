import React, { useRef, useEffect, useState } from 'react';
import '../modal/scrollbar.css';

interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
  onDelete: (id: number) => void;
}

// 날짜별로 알림을 그룹화하는 함수
const groupNotificationsByDate = (notifications: Notification[]) => {
  return notifications.reduce(
    (groups, notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString(); // 날짜만 추출
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].unshift(notification);
      return groups;
    },
    {} as { [date: string]: Notification[] }
  );
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onDelete
}) => {
  const groupedNotifications = groupNotificationsByDate(notifications);
  const sortedDates = Object.keys(groupedNotifications).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // 애니메이션 지속 시간과 일치시킵니다.
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed left-[96px] bottom-0 flex items-end justify-start">
      <div
        className={`bg-[#eeee] rounded-md p-1 relative w-[424px] h-[560px] max-h-[560px] ${
          isClosing ? 'animate-slide-down' : 'animate-slide-up'
        }`}
        ref={modalRef}
      >
        <div colSpan="2" className="border h-24 w-full bg-bgLayout mb-0">
          <h2 className="text-3xl font-bold text-white mt-7 ms-3">알림</h2>
        </div>

        <div className="p-4 scrollbar-none h-[calc(100%-96px)]" style={{ overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div className="text-center text-xl text-gray-500">알림이 없습니다.</div>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="mb-2">
                <h3 className="font-semibold text-xl mb-2">{date}</h3>
                <ul className="space-y-2">
                  {groupedNotifications[date].map((notification) => (
                    <li
                      key={notification.id}
                      className="flex justify-between items-center p-2 border-t-2 border-textGray01"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-bgComp text-base me-5">
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </span>
                        {notification.content.includes('비상정지 발생') ? (
                          <span className="text-error text-xl font-bold">
                            {notification.content}
                          </span>
                        ) : notification.content.includes('달성') ? (
                          <span style={{ color: 'green' }} className="text-xl font-bold">
                            {notification.content}
                          </span>
                        ) : (
                          <span style={{ color: 'black' }} className="text-xl">
                            {notification.content}
                          </span>
                        )}
                      </div>
                      <button
                        className=" text-black px-2 py-1 text-xl"
                        onClick={() => onDelete(notification.id)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

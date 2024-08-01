import React from 'react';

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

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl mb-4">알림</h2>
        <div>
          {sortedDates.map((date) => (
            <div key={date} className="mb-4">
              <h3 className="font-bold mb-2">{date}</h3>
              <ul>
                {groupedNotifications[date].map((notification) => (
                  <li key={notification.id} className="flex justify-between items-center mb-2">
                    <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>{' '}
                    {/* 시간만 추출 */}
                    <span>{notification.content}</span>
                    <button
                      className="bg-red-500 text-black px-2 py-1 rounded ml-2"
                      onClick={() => onDelete(notification.id)}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-500 text-black px-4 py-2 rounded" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;

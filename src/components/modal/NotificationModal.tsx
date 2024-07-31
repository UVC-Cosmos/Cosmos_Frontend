import React from 'react';

interface NotificationModalProps {
  notifications: Array<{ content: string; createdAt: string }>;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onDelete
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">알림</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="flex justify-between items-center mb-2">
              <span>{notification.content}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(notification.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <button className="mt-4 bg-blue-500 text-black px-4 py-2 rounded" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;

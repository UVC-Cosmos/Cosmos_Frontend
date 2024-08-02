// import React, { useEffect, useRef, useState } from 'react';

// interface Notification {
//   id: number;
//   content: string;
//   createdAt: string;
// }

// interface NotificationModalProps {
//   notifications: Notification[];
//   onClose: () => void;
//   onDelete: (id: number) => void;
// }

// // 날짜별로 알림을 그룹화하는 함수
// const groupNotificationsByDate = (notifications: Notification[]) => {
//   return notifications.reduce(
//     (groups, notification) => {
//       const date = new Date(notification.createdAt).toLocaleDateString(); // 날짜만 추출
//       if (!groups[date]) {
//         groups[date] = [];
//       }
//       groups[date].unshift(notification);
//       return groups;
//     },
//     {} as { [date: string]: Notification[] }
//   );
// };

// const NotificationModal: React.FC<NotificationModalProps> = ({
//   notifications,
//   onClose,
//   onDelete
// }) => {
//   const groupedNotifications = groupNotificationsByDate(notifications);
//   const sortedDates = Object.keys(groupedNotifications).sort(
//     (a, b) => new Date(b).getTime() - new Date(a).getTime()
//   );

//   const modalRef = useRef<HTMLDivElement | null>(null);

//   const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태 관리

//   useEffect(() => {
//     if (isOpen) {
//       // 모달이 열릴 때 애니메이션 시작
//       setTimeout(() => {
//         modalRef.current?.classList.remove('-translate-x-full', 'opacity-0');
//       }, 50);
//     } else {
//       // 모달이 닫힐 때 애니메이션 시작
//       modalRef.current?.classList.add('-translate-x-full', 'opacity-0');
//     }
//   }, [isOpen]);

//   // 닫기 버튼 클릭 시 onClose 호출 및 애니메이션 처리
//   const handleClose = () => {
//     modalRef.current?.classList.add('-translate-x-full', 'opacity-0');
//     setTimeout(() => {
//       onClose();
//     }, 300); // transition duration과 동일하게 설정
//   };

//   return (
//     <div
//       className={`fixed left-0 top-0 z-[100] flex size-full top-20 left-[7rem] bg-black bg-opacity-70
//       transform -translate-x-full opacity-0 transition-all duration-300 ${isOpen ? '' : 'hidden'}`}
//     >
//       {/* hidden 클래스 추가 */}
//       <div ref={modalRef} className="flex h-[80%] w-[25%] flex-col items-center bg-white">
//         {' '}
//         <div className="flex h-[100%] w-full flex-col gap-8">
//           <div className="w-[10%] text-xl mt-4 ml-4 border rounded-lg text-center py-2 bg-tableHeader text-white">
//             알림
//           </div>
//           <div className="h-full overflow-x-auto">
//             {sortedDates.map((date) => (
//               <div key={date} className="mb-4">
//                 <h3 className="font-bold mb-2">{date}</h3>
//                 <ul>
//                   {groupedNotifications[date].map((notification) => (
//                     <li key={notification.id} className="flex justify-between items-center mb-2">
//                       <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
//                       {/* 시간만 추출 */}
//                       <span>{notification.content}</span>
//                       <button
//                         className="bg-red-500 text-black px-2 py-1 rounded ml-2"
//                         onClick={() => onDelete(notification.id)}
//                       >
//                         삭제
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <button
//             className="mt-4 btn bg-blue-500 text-black px-4 py-2 rounded"
//             onClick={handleClose}
//           >
//             닫기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationModal;

import React, { useEffect, useRef, useState } from 'react';

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

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태 관리

  useEffect(() => {
    setIsOpen(true); // 모달을 열림 상태로 설정
  }, []);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 애니메이션 시작
      setTimeout(() => {
        modalRef.current?.classList.remove('-translate-x-full', 'opacity-0');
      }, 50);
    } else {
      // 모달이 닫힐 때 애니메이션 시작
      modalRef.current?.classList.add('-translate-x-full', 'opacity-0');
    }
  }, [isOpen]);

  // 닫기 버튼 클릭 시 onClose 호출 및 애니메이션 처리
  const handleClose = () => {
    modalRef.current?.classList.add('-translate-x-full', 'opacity-0');
    setTimeout(() => {
      onClose();
    }, 300); // transition duration과 동일하게 설정
  };

  return (
    <div
      className={`fixed left-0 top-0 z-[100] flex size-full top-20 left-[7rem] bg-black bg-opacity-70 
      transform transition-all duration-300 ${isOpen ? '' : 'hidden'}`}
    >
      <div
        ref={modalRef}
        className="flex h-[80%] w-[25%] flex-col items-center bg-white -translate-x-full opacity-0 transition-all duration-300"
      >
        <div className="flex h-[100%] w-full flex-col gap-8">
          <div className="w-[10%] text-xl mt-4 ml-4 border rounded-lg text-center py-2 bg-tableHeader text-white">
            알림
          </div>
          <div className="h-full overflow-x-auto">
            {sortedDates.map((date) => (
              <div key={date} className="mb-4">
                <h3 className="font-bold mb-2">{date}</h3>
                <ul>
                  {groupedNotifications[date].map((notification) => (
                    <li key={notification.id} className="flex justify-between items-center mb-2">
                      <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
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
          <button
            className="mt-4 btn bg-blue-500 text-black px-4 py-2 rounded"
            onClick={handleClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

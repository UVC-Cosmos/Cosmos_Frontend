import React, { useEffect, useRef } from 'react';
import useNotificationSocket from '../../hooks/useNotificationSocket';

const NotificationComponent: React.FC = () => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const userId = 'user123'; // 실제 사용자 ID를 사용
    socket.current = new WebSocket('ws://localhost:3000');

    socket.current.onopen = () => {
      console.log('WebSocket 연결 성공');
      // 사용자 정보를 서버로 전송
      socket.current?.send(JSON.stringify({ userId }));
    };

    socket.current.onmessage = (message) => {
      console.log('서버로부터 메시지 수신:', message.data);
    };

    socket.current.onclose = (event) => {
      console.log(`WebSocket 연결 종료: ${event.code}`);
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    return () => {
      socket.current?.close(1000, 'Client closed'); // 정상 종료 상태 코드
    };
  }, []);

  return <div>WebSocket 연결 테스트</div>;
};

export default NotificationComponent;

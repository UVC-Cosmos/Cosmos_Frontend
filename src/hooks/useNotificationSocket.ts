import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useNotificationSocket = (url: string, userId: string): [Socket | null, any] => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("노드서버에 연결 성공!");
            newSocket.emit("register", userId); // 사용자 ID 등록
        });

        newSocket.on("disconnect", () => {
            console.log("노드서버와 연결 해제!");
        });

        newSocket.on('notifications', (data) => {
            console.log('Received notifications:', data);
            setNotifications(data);
        });

        return () => {
            newSocket.close();
        };
    }, [url, userId]);

    return [socket, notifications];
};

export default useNotificationSocket;

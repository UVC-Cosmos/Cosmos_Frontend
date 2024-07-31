import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useNotificationSocket = (url: string): [Socket | null, any] => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [notifications, setNotifications] = useState<Array<{ content: string; createdAt: string; }>>([]);

    useEffect(() => {
        const newSocket = io(url, {
            withCredentials: true, // 쿠키를 포함하여 전송
            transports: ['websocket']
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Notification socket connected!");
        });

        newSocket.on("disconnect", () => {
            console.log("Notification socket disconnected!");
        });

        newSocket.on('notifications', (data) => {
            console.log('Received notifications:', data);
            setNotifications((prevNotifications) => [...prevNotifications, data]);
          });

        return () => {
            newSocket.close();
        };
    }, [url]);

    return [socket, notifications];
};

export default useNotificationSocket;

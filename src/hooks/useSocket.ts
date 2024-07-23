import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string, room: string): [Socket | null, (tagId: string, value: string) => void] => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket server");
            newSocket.emit("joinRoom", room);
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });

        return () => {
            newSocket.close();
        };
    }, [url, room]);

    const sendMessage = (tagId: string, value: string) => {
        if (socket) {
            const message = { tagId, value };
            socket.emit("control", room, JSON.stringify(message));
        } else {
            console.error("WebSocket is not open");
        }
    };

    return [socket, sendMessage];
};

export default useSocket;

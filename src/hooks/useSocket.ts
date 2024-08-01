// useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string, room: string): [Socket | null, (tagId: string, value: string) => void, any] => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [diceStats, setDiceStats] = useState(null);

    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("노드서버에 연결 성공!");
            newSocket.emit("joinRoom", room);
        });

        newSocket.on("disconnect", () => {
            console.log("노드서버와 연결 해제!");
        });

        newSocket.on('diceStats', (data) => {
            console.log('Received diceStats:', data);
            setDiceStats(data);
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

    return [socket, sendMessage, diceStats];
};

export default useSocket;

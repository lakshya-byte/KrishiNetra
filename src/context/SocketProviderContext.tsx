"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "./AuthProvider";

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AuthContext);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!user) return;

        // Initialize Socket
        const socketInstance = io("http://localhost:8000", { // Your Backend URL
            withCredentials: true, // <--- CRITICAL: Sends the cookies
            autoConnect: true,
            transports: ["websocket", "polling"], // Try websocket first
        });

        socketInstance.on("connect", () => {
            console.log("🟢 Socket Connected:", socketInstance.id);
            setIsConnected(true);
        });

        socketInstance.on("disconnect", (reason) => {
            console.log("🔴 Socket Disconnected:", reason);
            setIsConnected(false);
        });

        socketInstance.on("connect_error", (err) => {
            console.error("⚠️ Socket Connection Error:", err.message);
            // This will show if the backend auth middleware rejected the cookie
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
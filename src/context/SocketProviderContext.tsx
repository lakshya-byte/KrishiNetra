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

// Custom hook for easy access
export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AuthContext); // Get user from your existing AuthProvider
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // 1. Only connect if user is logged in
        if (user) {
            // Initialize Socket
            const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", {
                withCredentials: true, // Important for Cookies
                autoConnect: false,    // We connect manually below
            });

            // 2. Setup Listeners
            socketInstance.on("connect", () => {
                console.log("🟢 Socket Connected:", socketInstance.id);
                setIsConnected(true);
            });

            socketInstance.on("disconnect", () => {
                console.log("🔴 Socket Disconnected");
                setIsConnected(false);
            });

            socketInstance.on("connect_error", (err) => {
                console.error("Socket Connection Error:", err);
            });

            // 3. Connect!
            socketInstance.connect();
            setSocket(socketInstance);

            // 4. Cleanup on Unmount or Logout
            return () => {
                socketInstance.disconnect();
                setSocket(null);
                setIsConnected(false);
            };
        }
    }, [user]); // Re-run if user changes (Login/Logout)

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
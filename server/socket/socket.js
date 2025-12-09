import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie"; // Import cookie parser
import { User } from "../models/user.model.js";
import { ChatRoom } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

export const initChatSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000", // Your Frontend URL
            credentials: true, // Critical for cookies
            methods: ["GET", "POST"]
        }
    });

    // --- AUTH MIDDLEWARE ---
    io.use(async (socket, next) => {
        try {
            let token = socket.handshake.auth?.token;

            // 1. If no auth token, try reading from cookies (CRITICAL FIX)
            if (!token && socket.handshake.headers.cookie) {
                const cookies = cookie.parse(socket.handshake.headers.cookie);
                token = cookies.accessToken; // Name must match your cookie name
            }

            if (!token) {
                return next(new Error("Authentication error: No token found"));
            }

            // 2. Verify Token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded._id).select("-password");

            if (!user) {
                return next(new Error("Authentication error: User not found"));
            }

            // 3. Attach user to socket
            socket.data.user = {
                _id: user._id.toString(),
                name: user.name,
                role: user.role
            };

            next();
        } catch (err) {
            console.error("Socket Auth Error:", err.message);
            next(new Error("Authentication failed"));
        }
    });

    // --- CONNECTION HANDLER ---
    io.on("connection", (socket) => {
        const uid = socket.data.user._id;
        console.log(`✅ User connected: ${uid}`);

        // JOIN ROOM
        socket.on("joinRoom", async ({ roomId }, ack) => {
            try {
                // Optional: Add membership verification here for security
                // const isMember = await verifyMembership(uid, roomId);
                // if(!isMember) return ack?.({ ok: false, error: "Access Denied" });

                socket.join(roomId);
                console.log(`User ${uid} joined room: ${roomId}`);
                ack?.({ ok: true });
            } catch (error) {
                console.error("Join Room Error:", error);
                ack?.({ ok: false, error: "Server error" });
            }
        });

        // SEND MESSAGE
        socket.on("sendMessage", async ({ roomId, text }, ack) => {
            try {
                if (!roomId || !text) return ack?.({ ok: false, error: "Invalid data" });

                const message = await Message.create({
                    from: uid,
                    roomId,
                    text,
                    status: "sent"
                });

                // Populate sender info so frontend can display name/avatar immediately
                await message.populate("from", "name avatar role");

                // Broadcast to room
                io.to(roomId).emit("message", message);

                ack?.({ ok: true });
            } catch (error) {
                console.error("Send Message Error:", error);
                ack?.({ ok: false, error: "Failed to send" });
            }
        });

        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${uid}`);
        });
    });

    return io;
};
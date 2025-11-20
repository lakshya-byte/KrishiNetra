import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import {ChatRoom} from "../models/chat.model.js";
import {Message} from "../models/message.model.js";

export const initChatSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {origin: true, credentials: true}
    });

    // --- AUTH ---
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token) return next(new Error("No token"));

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded._id);
            if (!user) return next(new Error("Invalid user"));

            socket.data.user = {_id: user._id.toString(), name: user.name};
            next();
        } catch (err) {
            next(new Error("Auth failed"));
        }
    });

    // --- ON CONNECT ---
    io.on("connection", (socket) => {
        const uid = socket.data.user._id;
        console.log("Connected:", uid);

        // JOIN ROOM
        socket.on("joinRoom", async ({roomId}, ack) => {
            const room = await ChatRoom.findOne({roomId});
            if (!room) return ack?.({ok: false});

            socket.join(roomId);
            ack?.({ok: true});
        });

        // SEND MESSAGE
        socket.on("sendMessage", async ({roomId, text}, ack) => {
            const message = await Message.create({
                from: uid,
                roomId,
                text,
                status: "sent"
            });

            io.to(roomId).emit("message", {
                from: uid,
                roomId,
                text,
                _id: message._id
            });

            ack?.({ok: true});
        });
    });

    return io;
};

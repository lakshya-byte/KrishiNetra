// server.js
import dotenv from "dotenv";
import http from "http";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { initChatSocket } from "./socket/socket.js";   // << IMPORTANT

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 8000;

(async () => {
    try {
        // Connect DB first
        await connectDB();
        console.log("🌱 MongoDB connected");

        // Create HTTP server (REQUIRED for socket.io)
        const server = http.createServer(app);

        // Initialize Socket.IO with the HTTP server
        initChatSocket(server);

        // Start HTTP + Socket.IO server
        server.listen(PORT, "0.0.0.0",() => {
            console.log(`🚀 Server is listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server startup failed:", error);
    }
})();


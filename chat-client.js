// chat-client.cjs
// Usage:
// $env:SERVER="http://localhost:8000"
// $env:TOKEN="<JWT>"
// $env:ROOM="private:<id1>:<id2>"
// $env:NAME="Farmer"
// node chat-client.cjs

import { io } from "socket.io-client";
import readline from "readline";

const SERVER = process.env.SERVER || "http://localhost:8000";
const TOKEN = process.env.TOKEN;
const ROOM = process.env.ROOM;
const NAME = process.env.NAME || "Me";

if (!TOKEN || !ROOM) {
    console.error("Missing env vars. Example:");
    console.error('Set $env:SERVER, $env:TOKEN, $env:ROOM, $env:NAME then run node chat-client.cjs');
    process.exit(1);
}

// create readline BEFORE socket handlers to avoid referencing it early
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${NAME}> `,
});

function promptInput() {
    rl.prompt();
    // single line handler for input
    rl.on("line", (line) => {
        const text = line.trim();
        if (!text) {
            rl.prompt();
            return;
        }
        // send message with ack
        socket.emit("sendMessage", { roomId: ROOM, text }, (res) => {
            if (!res || !res.ok) {
                console.error(`[${NAME}] send failed:`, res?.error || res);
            } else {
                console.log(`[${NAME}] -> ${text}`);
            }
            rl.prompt();
        });
    });
}

// connect with JWT in auth; do not force transports (allow polling fallback)
const socket = io(SERVER, {
    auth: { token: TOKEN },
    reconnectionAttempts: 3,
});

socket.on("connect", () => {
    console.log(`[${NAME}] connected, socketId:`, socket.id);

    // auto-join on connect
    socket.emit("joinRoom", { roomId: ROOM }, (res) => {
        if (!res || !res.ok) {
            console.error(`[${NAME}] joinRoom failed:`, res?.error || res);
            process.exit(1);
        }
        console.log(`[${NAME}] joined room:`, ROOM);
        promptInput();
    });
});

socket.on("connect_error", (err) => {
    console.error(`[${NAME}] connect_error:`, err.message || err);
    process.exit(1);
});

// incoming messages from server
socket.on("message", (msg) => {
    // print incoming message and restore prompt
    console.log(`\n[${NAME}] <- ${msg.from}: ${msg.text}`);
    rl.prompt(true);
});

// optional events
socket.on("roomJoined", (p) => console.log(`[${NAME}] roomJoined:`, p));
socket.on("connected", (p) => console.log(`[${NAME}] server says connected:`, p));

// cleanup on exit
function shutdown() {
    console.log(`\n[${NAME}] exiting...`);
    rl.close();
    socket.disconnect();
    process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

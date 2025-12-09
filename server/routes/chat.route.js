import express from "express";
import {createPrivateRoom, getAllUsers, getRoomMessages} from "../controllers/chat.controller.js"; // your controller
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// create private room (Farmer ↔ Distributor)
router.post("/rooms", verifyJWT, createPrivateRoom);
router.get("/messages/:roomId", verifyJWT, getRoomMessages); // Load History
router.get("/users", verifyJWT, getAllUsers); // <--- New Route for Sidebar

export default router;

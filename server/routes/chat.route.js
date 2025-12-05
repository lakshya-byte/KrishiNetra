import express from "express";
import { createPrivateRoom } from "../controllers/chat.controller.js"; // your controller
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// create private room (Farmer ↔ Distributor)
router.post("/rooms", verifyJWT, createPrivateRoom);

export default router;

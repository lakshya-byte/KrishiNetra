import express from "express";
const router = express.Router();
import { loginUser, logoutUser,registerFarmer,registerBuyer } from "../controllers/auth.controller.js";

// http://localhost:3000/api/auth

router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/registerFarmer", registerFarmer);
router.post("/registerBuyer", registerBuyer);

export default router;
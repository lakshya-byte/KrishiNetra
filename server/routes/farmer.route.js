import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
import {getMyBatches,createBatch} from "../controllers/farmer.controller.js";

// http://localhost:3000/api/farmer

router.post("/create-batch", verifyJWT, createBatch);
router.get("/get-my-batches", verifyJWT, getMyBatches);
router.get("/farmer-home", (req, res) => {
    res.send("Welcome to the Farmer Home Page");
})

export default router;
import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();
import {getMyBatches,createBatch,enlistBatch , updateBatch, startBidding,stopBidding, completeTransaction} from "../controllers/farmer.controller.js";

// http://localhost:3000/api/farmer

router.post("/create-batch", verifyJWT, createBatch);
router.get("/get-my-batches", verifyJWT, getMyBatches);
router.post("/enlist-batch", verifyJWT, enlistBatch);
router.post("/start-bidding", verifyJWT, startBidding);
router.post("/stop-bidding", verifyJWT, stopBidding);
router.post("/complete-transaction", verifyJWT, completeTransaction);
router.post("/update-batch", verifyJWT, updateBatch);

router.get("/farmer-home", (req, res) => {
    res.send("Welcome to the Farmer Home Page");
})

export default router;
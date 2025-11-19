import express from 'express';
const router = express.Router();
import { getAllBatches, getBatchById } from "../controllers/distributor.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// https://localhost:8000/api/distributor
router.get('/all-batches', verifyJWT, getAllBatches);
router.get('/batch/:id', verifyJWT, getBatchById);

export default router;
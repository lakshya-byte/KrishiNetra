import express from "express";
const router = express.Router();
import { createDispute ,getMyDisputes} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// http://localhost:8000/api/user

router.post('/create-dispute', verifyJWT, createDispute)
router.get('/my-disputes',verifyJWT, getMyDisputes)

export default router
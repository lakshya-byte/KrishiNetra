// routes/residueRoutes.js

import express from "express";
import {
    createResidue,
    getAllResidue,
    getMyResidue,
    buyResidue,   
} from "../controllers/residue.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js"; 

const router = express.Router();

router.post("/", verifyJWT, createResidue);
router.get("/mine", verifyJWT, getMyResidue);
router.get("/", getAllResidue);
router.put("/:id/buy", verifyJWT, buyResidue);

export default router;

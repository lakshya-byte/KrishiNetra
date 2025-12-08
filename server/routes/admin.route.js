import express from "express";
const router = express.Router();
import {} from "../controllers/admin.controller.js";
import { get } from "http";
import { getAllFarmers,getAllDistributors,getAllBatches,getAllRetailers} from "../controllers/admin.controller.js";

// http://localhost:3000/api/admin
router.get("/get-all-farmers", getAllFarmers);
router.get("/get-all-distributors",getAllDistributors);
router.get("/get-all-retailers",getAllRetailers);
router.get("/get-all-batches",getAllBatches);

export default router;
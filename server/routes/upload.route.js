import express from "express";
import {upload} from "../middleware/multer.js";
import { uploadImages } from "../controllers/upload.controller.js";

const router = express.Router();

//  file upload
router.post("/upload-images", upload.array("images", 5), uploadImages);

export default router;

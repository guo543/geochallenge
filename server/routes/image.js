import express from "express";
import { uploadImage, reportImage } from "../controllers/image.js"
import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getImages);
// router.get("/rand", getRandomImage);
router.post("/upload",auth, uploadImage);
router.patch("/:id/report", auth, reportImage);
// router.delete("/:id", deleteImage);

export default router;
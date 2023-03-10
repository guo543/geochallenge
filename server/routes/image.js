import express from "express";
import { getImages, uploadImage, reportImage } from "../controllers/image.js"
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getImages);
// router.get("/rand", getRandomImage);
router.post("/", auth, uploadImage);
router.patch("/:id/report", auth, reportImage);
// router.delete("/:id", deleteImage);

export default router;
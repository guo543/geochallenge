import express from "express";
import { uploadImage } from "../controllers/image.js"

const router = express.Router();

// router.get("/", getImages);
// router.get("/rand", getRandomImage);
router.post("/", uploadImage);
// router.patch("/:id", reportImage);
// router.delete("/:id", deleteImage);

export default router;
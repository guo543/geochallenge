import express from "express";
import { getImagesByUserId, uploadImage, reportImage } from "../controllers/image.js"
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getImagesByUserId);
// router.get("/rand", getRandomImage);
router.post("/", auth, uploadImage);
router.patch("/:id/report", auth, reportImage);
// router.delete("/:id", deleteImage);
router.post("/uploadprofilepicture", auth, uploadProfilePicture);

export default router;
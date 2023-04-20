import express from "express";
import auth from "../middleware/auth.js";
import { 
    getImagesByUserId, 
    uploadImage, 
    reportImage, 
    getRandomImage,
    getFlagged,
    setFlagged
} from "../controllers/image.js"

const router = express.Router();

router.get("/", auth, getImagesByUserId);
router.get("/rand", getRandomImage);
router.post("/", auth, uploadImage);
router.patch("/:id/report", auth, reportImage);
router.get("/flagged", getFlagged);
router.post("/flagged", setFlagged);

// router.delete("/:id", deleteImage);
router.patch("/:id/updateDifficultyLevel");

export default router;
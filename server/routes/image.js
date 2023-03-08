import express from "express";

const router = express.Router();

router.get("/", getImages);
router.get("/rand", getRandomImage);
router.post("/", uploadImage);
router.patch("/:id", reportImage);
router.delete("/:id", deleteImage);

export default router;
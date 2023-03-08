import express from "express";

const router = express.Router();

const imageRoutePlaceholder = (req, res) => {
    res.send("image route: placeholder");
};

// router.get("/", getImages);
// router.get("/rand", getRandomImage);
// router.post("/", uploadImage);
// router.patch("/:id", reportImage);
// router.delete("/:id", deleteImage);

router.get("/", imageRoutePlaceholder);
router.get("/rand", imageRoutePlaceholder);
router.post("/", imageRoutePlaceholder);
router.patch("/:id", imageRoutePlaceholder);
router.delete("/:id", imageRoutePlaceholder);

export default router;
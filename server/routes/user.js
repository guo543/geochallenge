import express from "express";

import {
  signin,
  signup,
  verification,
  checkcode,
  resetpassword,
  changeProfilePicture,
  updateScoreRecords,
  getScoreRecords,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verification", verification);
router.post("/checkcode", checkcode);
router.patch("/resetpassword", resetpassword);
router.patch("/:id/profilePic", auth, changeProfilePicture);
router.patch("/:id/updateScoreRecords", auth, updateScoreRecords);
router.get("/getScoreRecords", getScoreRecords);
export default router;

import express from "express";

import {
  signin,
  signup,
  verification,
  checkcode,
  resetpassword,
  changeProfilePicture,
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
router.post("/getScoreRecords", getScoreRecords);
export default router;

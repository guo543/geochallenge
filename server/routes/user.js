import express from "express";

import {
  signin,
  signup,
  verification,
  checkcode,
  resetpassword,
  getScoreRecords,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verification", verification);
router.post("/checkcode", checkcode);
router.post("/resetpassword", resetpassword);
router.post("/getScoreRecords", getScoreRecords);
export default router;

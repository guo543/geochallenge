import express from "express";

import {
  signin,
  signup,
  verification,
  checkcode,
  resetpassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/verification", verification);
router.post("/checkcode", checkcode);
router.post("/resetpassword", resetpassword);
export default router;

import express from 'express';

import { signin, signup, verification} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/verification',verification)
export default router;
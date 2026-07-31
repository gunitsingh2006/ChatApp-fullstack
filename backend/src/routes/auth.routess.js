import express from 'express'
import { login, logout, signup} from "../controller/auth.controllerr.js"
import { protectRoute,  } from '../middlewear/auth.middlewear.js';
import { onboard } from '../controller/auth.controllerr.js';
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectRoute , onboard )

export default router;
import express from 'express'
import { protectRoute } from '../middlewear/auth.middlewear.js';
import { getMyFriends, getRecommendatedUsers } from '../controller/user.controllerr';

const router = express.Router();

// OR // router.use(protectRoute) // Apply the protectRoute middleware to all routes in this router

router.get("/", protectRoute ,getRecommendatedUsers)
router.get("/friends", protectRoute , getMyFriends)


export default router;
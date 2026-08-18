import express from "express";
import { protectRoute } from "../middlewear/auth.middlewear.js"; 
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controller/user.controllerr.js";
// import { } from '../controller/user.controllerr.js';

const router = express.Router();

// OR // router.use(protectRoute) // Apply the protectRoute middleware to all routes in this router

router.get("/", protectRoute ,getRecommendedUsers);
router.get("/friends", protectRoute , getMyFriends);

router.post("/friend-requests/:id", protectRoute , sendFriendRequest);
router.put("/friend-requests/:id/accept", protectRoute , acceptFriendRequest);

//TODO:create rejest friend request route



// for getting the notification of the friend request we will create a new route get method and we will get the friend request of the user and we will send it to the frontend
router.get("/friend-requests", protectRoute , getFriendRequests);
// for the friend req that we have sent, will send it to the frontend
router.get("/outgoing-friend-requests", protectRoute , getOutgoingFriendReqs);

export default router;
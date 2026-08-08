import express from "express";
import { protectRoute } from "../middlewear/auth.middlewear.js";
import { getStreamToken } from "../controller/chat.controllerr.js";
const router = express.Router();

router.get("/token", protectRoute, getStreamToken)
export default router;
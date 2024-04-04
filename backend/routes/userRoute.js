import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebars } from "../controllers/userController.js";
const router = express.Router();

router.get("/",protectRoute,getUsersForSidebars);

export default router;
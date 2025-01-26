import express from "express"
import { createUser, loginUser, logoutUser, userProfile } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/me",isAuthenticated, userProfile);
export default router


import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Public routes (no auth needed)
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes (auth middleware required)
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.put("/profile", authMiddleware, updateUserProfile);
userRouter.put("/change-password", authMiddleware, changePassword);

export default userRouter;

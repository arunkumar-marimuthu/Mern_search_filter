import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
} from "../controller/UserController.js"; // Import functions

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.post("/login", loginUser);

export default router; // Export the router

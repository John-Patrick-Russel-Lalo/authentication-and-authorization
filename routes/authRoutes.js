import express from "express";
import { register } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// protected test route
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "You are authenticated",
        user: req.user
    });
});

export default router;
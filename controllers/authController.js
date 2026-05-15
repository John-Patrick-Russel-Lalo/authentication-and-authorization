import bcrypt from "bcryptjs";
import { createUser } from "../models/userModel.js";
import { loginUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await createUser(firstName, lastName, email, password);

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
    });

  } catch (err) {
    res.status(err.status || 400).json({
      message: err.message,
    });
  }
};

export const logout = (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out"
    });
};

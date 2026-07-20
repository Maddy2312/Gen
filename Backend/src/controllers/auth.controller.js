import config from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = async (user, res, message) => {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token);
  return res.status(200).json({
    success: true,
    message: message,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
};
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      contact,
      role,
    });

    await generateToken(user, res, "User registered successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    await generateToken(user, res, "User logged in successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            role: user.role,
        }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
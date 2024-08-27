import userModel from "../model/UserModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

// Create a user API

export const createUser = async (req, res) => {
  const { firstName,lastName, mail, mobile, password,role } = req.body; // Destructure vehicles from body
  
  try {
    // Check if the email already exists
    const oldUser = await userModel.findOne({ mail });

    if (oldUser) {
      return res.status(409).json({
        status: false,
        message: "Email already exists!",
        code: 409,
        data: null,
      });
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create the user first
    const user = await userModel.create({
      firstName,
      lastName,
      mail,
      mobile,
      password: encryptedPassword,
      role
    });

    res.status(201).json({
      status: true,
      message: "User Created Successfully!",
      code: 201,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      code: 500,
      data: null,
    });
  }
};

// Get all users

export const getAllUsers = async (req, res) => {
  try {
    // Find all users and populate the vehicles field with all details
    const users = await userModel.find({});

    res.status(200).json({
      status: true,
      message: "Success",
      code: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      code: 500,
      data: null,
    });
  }
};


// Login user
export const loginUser = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await userModel.findOne({ mail });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User does not exist",
        code: 401,
        data: null,
        token: null,
      });
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (validUser) {
      const token = jwt.sign({ user }, process.env.Secret_Key, {
        expiresIn: "2h",
      });
      return res.status(200).json({
        status: true,
        message: "Login Successful!",
        code: 200,
        data: user,
        token,
      });
    }

    res.status(401).json({
      status: false,
      message: "Password is incorrect",
      code: 401,
      data: null,
      token: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      code: 500,
      data: null,
      token: null,
    });
  }
};

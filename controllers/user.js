import bcrypt from "bcrypt"
import User from "../models/user.js"
import ErrorHandler from "../middlewares/error.js"
import { sendCookie } from "../utils/sendCookie.js"
import generateApiKey from "../utils/generateApiKey.js"
import { sendApiKeyEmail } from "../utils/sendEmail.js"

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return next(new ErrorHandler(400, "All fields are required"))
    }

    let user = await User.findOne({ email })
    if (user) {
      return next(new ErrorHandler(400, "User already exists"))
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Generate API key
    const apiKeyString = generateApiKey()

    // Create user with API key
    user = await User.create({
      name,
      email,
      password: hashPassword,
      apiKey: {
        key: apiKeyString,
        requestCount: 0,
        requestLimit: 1000,
        active: true,
      },
    })

    // Send API key email
    try {
      await sendApiKeyEmail(user._id, apiKeyString)
    } catch (emailError) {
      console.error("Error sending API key email:", emailError)
      // Log the error but don't stop the registration process
    }

    sendCookie(user, res, "User registered successfully", 201)
  } catch (error) {
    console.error("Error during user registration:", error)
    next(new ErrorHandler(500, "Error during registration"))
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new ErrorHandler(400, "Email and password are required"))
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return next(new ErrorHandler(404, "User not found"))
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return next(new ErrorHandler(401, "Invalid email or password"))
    }

    // Send API key email
    try {
      await sendApiKeyEmail(user._id, user.apiKey.key)
    } catch (emailError) {
      console.error("Error sending API key email:", emailError)
      // Log the error but don't stop the login process
    }

    sendCookie(user, res, "Login successful", 200)
  } catch (error) {
    next(new ErrorHandler(500, "Internal server error during login"))
  }
}

export const logoutUser = async (req, res, next) => {
  try {
    res
      .clearCookie("token", {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logout successful",
      })
  } catch (error) {
    next(new ErrorHandler(500, "Error during logout"))
  }
}


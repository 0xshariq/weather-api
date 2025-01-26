import  User  from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers['authorization']; // Use lowercase for header key
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after 'Bearer'
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.id).select('-password'); // Use 'id' instead of '_id' based on standard JWT payload

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    // Attach user info to the request object
    req.user = user;
    console.log('Authenticated User:', user);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Check for JWT-specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }

    // Handle unexpected errors
    console.error('Authentication Middleware Error:', error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again.",
    });
  }
};
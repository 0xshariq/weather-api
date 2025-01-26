import { ApiKey } from "../models/apikey.models.js"
import User from "../models/user.js"

export const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.query.key || req.headers["x-api-key"]

    if (!apiKey) {
      return res.status(401).json({ message: "API key is missing" })
    }

    // Find the user with the given API key
    const user = await User.findOne({ apiKey: apiKey }).populate("apiKey")

    if (!user || !user.apiKey) {
      return res.status(403).json({ message: "Invalid API key" })
    }

    const keyData = user.apiKey

    if (!keyData.active) {
      return res.status(403).json({ message: "API key is inactive" })
    }

    if (keyData.requestCount >= keyData.requestLimit) {
      return res.status(429).json({ message: "Request limit exceeded" })
    }

    // Increment the request count
    await ApiKey.findByIdAndUpdate(keyData._id, { $inc: { requestCount: 1 } })

    // Attach the API key to the request object for potential use in route handlers
    req.apiKey = apiKey
    req.user = user

    next()
  } catch (error) {
    console.error("Error in API key middleware:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}


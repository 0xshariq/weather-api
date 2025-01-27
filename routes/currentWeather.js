import express from "express"
import { getCityCurrentWeather } from "../controllers/currentWeather.js"
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware.js"

const router = express.Router()

// Apply the API key middleware to all routes in this router
router.use(apiKeyMiddleware)

// Route to get current weather for a city
router.get("/", getCityCurrentWeather)

export default router


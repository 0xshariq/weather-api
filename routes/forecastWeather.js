import express from "express"
import { getCityForecastWeather } from "../controllers/forecastWeather.js"
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware.js"

const router = express.Router()

// Apply the API key middleware to all routes in this router
router.use(apiKeyMiddleware)

// Route to get forecast weather for a city for a specific number of days
router.get("/:cityName/days/:day", getCityForecastWeather)

export default router


import dotenv from "dotenv"

dotenv.config()

export const getCityForecastWeather = async (req, res) => {
  try {
    const { city, days } = req.query

    if (!city) {
      return res.status(400).json({ message: "City parameter is required" })
    }

    const numDays = Number.parseInt(days) || 5 // Default to 5 days if not specified or invalid

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&aqi=yes&days=${numDays}`,
    )

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching forecast weather:", error)
    res.status(500).json({
      message: "An error occurred while fetching the weather forecast",
      error: error.message,
    })
  }
}


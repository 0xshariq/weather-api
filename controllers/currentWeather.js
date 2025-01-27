import dotenv from "dotenv"

dotenv.config()

export const getCityCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query

    if (!city) {
      return res.status(400).json({ message: "City parameter is required" })
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&aqi=yes`,
    )

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching current weather:", error)
    res.status(500).json({
      message: "An error occurred while fetching the current weather",
      error: error.message,
    })
  }
}


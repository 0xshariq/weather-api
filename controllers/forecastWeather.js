export const getCityForecastWeather = async (req, res) => {
    try {
        const {cityName} = req.params;
        const {day} = req.params;
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${cityName}&aqi=yes&days=${day}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
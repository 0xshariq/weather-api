export const getCityCurrentWeather = async (req, res) => {
    try {
        const cityName = req.params.cityName;
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${cityName}&aqi=yes`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
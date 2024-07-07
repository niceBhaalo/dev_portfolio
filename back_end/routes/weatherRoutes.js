const express = require('express');
const axios = require('axios');
const router = express.Router();
const weatherAPIKey = '03990d59aff54e4faaf210058240507'
// Object to store cached data
let cachedData = {};

// Function to fetch city data from WeatherAPI
const fetchCityData = async (city) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city}`);
        console.log(response.data);
        return {
            city: city,
            temperature: response.data
        };
    } catch (error) {
        console.error(`Error fetching data for ${city}:`, error);
        return null;
    }
};

// Middleware to check cache and fetch data if not available
const getCityData = async (req, res, next) => {
    const cities = ['Paris', 'London', 'Toronto', 'Islamabad']; // replace with your cities
    const results = [];

    for (let city of cities) {
        // Check if data for this city is cached
        if (cachedData[city] && Date.now() - cachedData[city].timestamp < 4 * 60 * 60 * 1000) {
            // Use cached data
            results.push(cachedData[city].data);
        } else {
            // Fetch data from WeatherAPI
            const data = await fetchCityData(city);
            if (data) {
                // Cache the fetched data
                cachedData[city] = {
                    timestamp: Date.now(),
                    data: data
                };
                results.push(data);
            }
        }
    }

    req.cityData = results;
    next();
};

// Route to get city data
router.get('/get-city-data', getCityData, (req, res) => {
    res.json(req.cityData);
});

module.exports = router;

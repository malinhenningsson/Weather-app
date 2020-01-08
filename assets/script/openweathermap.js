/**
 * Openweathermap API
 * 
 * 
 * Key: 5d0a30d5db436cdfeaaead92bf275765
 * 
 * API: http://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6,se&appid=5d0a30d5db436cdfeaaead92bf275765
 * 
 */

const API_KEY = '5d0a30d5db436cdfeaaead92bf275765';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

// /weather?q=Malmö,se&appid=

const getCurrentWeather = async (city) => {
    // get weather from API
    const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);

    // convert from JSON
    const data = await response.json();

    // return current forecast
    return data;
}

getCurrentWeather();
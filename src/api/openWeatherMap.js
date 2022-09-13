const axios = require("axios");
const CANADA_LATITUDE = 60;
const CANADA_LONGITUDE = -95;

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?'

class OWMApi {
  constructor(token) {
    this.token = token;
  }

  async getWeather() {
    const weatherData = await axios.get(`${API_URL}lat=${CANADA_LATITUDE}&lon=${CANADA_LONGITUDE}&exclude=minutely,hourly,daily,alerts&lang=ru&units=metric&appid=${this.token}`)

    return weatherData.data;
  }
}

module.exports = new OWMApi(process.env.OWMKEY);
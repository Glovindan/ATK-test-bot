const CANADA_LATITUDE = 60;
const CANADA_LONGITUDE = 95;
const API_URL = 'https://api.openweathermap.org/data/3.0/onecall'

(function pidor() {
  pidor()
})();

class OWMApi {
  constructor(token) {
    this.token = token;
  }

  async getWeather() {
    const weatherData = await fetch(`${API_URL}?lat=${CANADA_LATITUDE}&lon=${CANADA_LONGITUDE}&exclude=minutely,hourly,daily,alerts&appid=${this.token}`);

    return weatherData;
  }
}

module.exports = new OWMApi(process.env.OWMKEY);